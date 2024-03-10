import BackButton from '@renderer/components/BackButton'
import DragButton from '@renderer/components/DragButton'
import { useState } from 'react'

const Squeeze = (): JSX.Element => {
  const [text, setText] = useState<string>('')
  const [shorterText, setShorterText] = useState<string>('')

  const squeeze = async (): Promise<void> => {
    if (!text) return
    const result = await window.api.squeezeText(
      text,
      shorterText ? shorterText.length / 2 : text.length / 2
    )
    setShorterText(result)
  }

  const resetText = (): void => {
    setText('')
    setShorterText('')
  }
  return (
    <div style={{ paddingBottom: '10%', display: 'flex', flexDirection: 'column' }}>
      <BackButton />
      <div style={{ fontSize: '40px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>SQUEEZE</div>
      <textarea
        placeholder="tl;dr"
        cols={80}
        rows={20}
        value={shorterText ? shorterText : text}
        disabled={shorterText ? true : false}
        onChange={(e) => {
          const value = e.target.value
          shorterText ? setShorterText(value) : setText(value)
        }}
      />
      <button onClick={resetText}>reset</button>
      <div>
        <p>origin length : {text.length}</p>
        <p>squeeze length : {shorterText.length}</p>
      </div>
      <DragButton description="make it shorter!" activeCallback={squeeze} />
    </div>
  )
}

export default Squeeze
