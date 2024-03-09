import DragButton from '@renderer/components/DragButton'
import Ai from '@renderer/assets/ai.svg?react'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { pageState } from '@renderer/state/AppState'

const Home = (): JSX.Element => {
  const [modelPath, setModelPath] = useState<string | null>(null)
  const setPage = useSetRecoilState(pageState)

  const findModelFile = async (): Promise<string | null> => {
    const filePath = await window.api.getModelFile()
    setModelPath(filePath)
    return filePath
  }

  const startApplication = (): void => {
    const image = document.getElementById('ai-image')
    if (modelPath == null) {
      image!.style.transform = 'scale(1.2)'
      image!.style.fill = 'red'
      return
    }
    setPage('Squeeze')
  }

  return (
    <>
      <div style={{ fontSize: '72px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>GOOFY</div>
      <Ai
        id="ai-image"
        width={'150px'}
        height={'150px'}
        fill={'white'}
        style={{ cursor: 'pointer', transition: 'transform 0.2s ease, fill 0.2s ease' }}
        onClick={findModelFile}
        onMouseEnter={(e) => {
          ;(e.currentTarget as SVGSVGElement).style.transform = 'scale(1.2)'
          ;(e.currentTarget as SVGSVGElement).style.fill = 'red'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as SVGSVGElement).style.transform = 'scale(1)'
          ;(e.currentTarget as SVGSVGElement).style.fill = 'white'
        }}
      />
      <p>{modelPath ? modelPath : '^^ Please select model file(gguf) ^^'}</p>
      <DragButton description={'May I help you..?'} activeCallback={startApplication} />
    </>
  )
}

export default Home
