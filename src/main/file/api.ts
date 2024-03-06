import { dialog } from 'electron'

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

  return result?.join('/') ?? null
}

export { getFile }
