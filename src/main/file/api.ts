import { dialog } from 'electron'
import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages'

let modelPath

const findModelFile = (): string | null => {
  const result = dialog.showOpenDialogSync({
    properties: ['openFile'],
    filters: [
      {
        name: 'GGUF',
        extensions: ['gguf']
      }
    ]
  })

  if (result === undefined) return null

  const filePath = result.join('/')
  modelPath = filePath
  return filePath
}

const squeeze = async (inputText: string, length: number): Promise<string> => {
  return await retrieveSingleLlmResponse(
    modelPath,
    "You are a sincere assistant. Performs the user's request without exception. Do not write explanations on replies.",
    `${inputText} \n ------------- \n make this text into approximately ${length} characters.`
  )
}

const emoji = async (text: string): Promise<string> => {
  return await retrieveSingleLlmResponse(
    modelPath,
    `You are text-to-emoji converter.`,
    `Give me an emoji unicode that can represent the input string. input string =  "${text}"`,
    [
      {
        question:
          'Give me an emoji unicode that can represent the input string. input string = flower',
        answer: "Here's the Unicode for the flower emoji (🌸): U+1F339"
      },
      {
        question: `Give me an emoji unicode that can represent the input string. input string = "how to make snake game in python"`,
        answer: `The input string "how to make snake game in python" is a question about programming, and it doesn't directly relate to an emoji. However, if I were to find an emoji that could be somewhat related to the topic of creating a game, I would suggest the video game emoji (🎮): U+1F380.`
      }
    ]
  )
}

interface IShot {
  question: string
  answer: string
}

const retrieveSingleLlmResponse = async (
  modelPath: string,
  systemPrompt: string,
  instruction: string,
  fewShots?: IShot[]
): Promise<string> => {
  //   const llm = await import('@langchain/community/llms/llama_cpp')
  //   const model = new llm.LlamaCpp({ modelPath: modelPath, verbose: true })
  const llm = await import('@langchain/community/chat_models/llama_cpp')
  const model = new llm.ChatLlamaCpp({
    modelPath: modelPath,
    verbose: true,
    batchSize: 1024
  })

  const shotMessages =
    fewShots?.flatMap(({ question, answer }) => {
      const hm = new HumanMessage({ content: question })
      const am = new AIMessage({ content: answer })
      return [hm, am]
    }) ?? []

  const response = await model.invoke([
    new SystemMessage({
      content: systemPrompt
    }),
    ...shotMessages,
    new HumanMessage({
      content: instruction
    })
  ])
  return response.content as string
  //   return response
}

export { findModelFile, squeeze, emoji }
