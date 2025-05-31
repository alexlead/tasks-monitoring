import { ElectronAPI } from '@electron-toolkit/preload'

interface CustomAPI {
  readFile: (path: string) => Promise<string>
  openDialog: () => Promise<string[]>
}


declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}
