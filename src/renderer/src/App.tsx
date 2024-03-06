import { useState } from 'react'
import Versions from './components/Versions'

function App(): JSX.Element {
  const [modelPath, setModelPath] = useState<string | null>(null)
  const getModelFile = async (): Promise<string | null> => {
    const filePath = await window.api.getModelFile()
    setModelPath(filePath)
    return filePath
  }

  return (
    <>
      <p>import gguf models</p>
      <button onClick={getModelFile}>import</button>
      <p>{modelPath ?? 'please import'}</p>
      <Versions></Versions>
    </>
  )
}

export default App
