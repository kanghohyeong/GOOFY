import { dialog } from 'electron'
import { SystemMessage, HumanMessage } from '@langchain/core/messages'

let modelPath

const getFile = (): string | null => {
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
  const llm = await import('@langchain/community/chat_models/llama_cpp')
  const model = new llm.ChatLlamaCpp({ modelPath: modelPath, verbose: true })
  console.log('model ok')
  const response = await model.invoke([
    new SystemMessage({
      content:
        "You are a sincere assistant. Performs the user's request without exception. Do not write explanations on replies."
    }),
    new HumanMessage({
      content: `${inputText} \n ------------- \n make this text into approximately ${length} characters.`
    })
  ])
  console.log(response)
  return response.content as string
}

export { getFile, squeeze }
