import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Customl APIs for renderer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const api: any = {
  getModelFile: () => ipcRenderer.invoke('get-gguf-model'),
  squeezeText: (text: string, length: number) => ipcRenderer.invoke('squeeze-text', text, length),
  emojiText: (text: string) => ipcRenderer.invoke('emoji-text', text)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
