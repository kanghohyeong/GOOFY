import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getModelFile: () => Promise<string | null>
      squeezeText: (string, number) => Promise<string>
    }
  }
}
