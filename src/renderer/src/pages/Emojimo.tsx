import BackButton from '@renderer/components/BackButton'
import DragButton from '@renderer/components/DragButton'
import HomeButton from '@renderer/components/HomeButton'
import { useState } from 'react'

const Emojimo = (): JSX.Element => {
  const [text, setText] = useState('')
  const [emoji, setEmoji] = useState<string[] | null>(null)

  const getEmoji = async (): Promise<void> => {
    const response = await window.api.emojiText(text)
    const emoji = extractEmoji(response)
    setEmoji(emoji ?? null)
  }

  const extractEmoji = (string: string): string[] => {
    const UNICODE =
      /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu
    return Array.from(string.matchAll(UNICODE), (match) => match[0])
  }

  return (
    <>
      <HomeButton />
      <BackButton />
      <div style={{ fontSize: '40px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Emojimo</div>
      <input
        type="text"
        value={text}
        placeholder="text here"
        style={{ width: '300px', fontSize: '20px' }}
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
      <div style={{ textAlign: 'center' }}>
        {emoji?.map((e) => (
          <>
            <span
              key={e}
              style={{ fontSize: '60px', cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(e)
              }}
            >
              {e}
            </span>
            <p>click emoji to copy</p>
          </>
        ))}
      </div>
      <DragButton description="Give me Emoji" activeCallback={getEmoji} />
    </>
  )
}

export default Emojimo
