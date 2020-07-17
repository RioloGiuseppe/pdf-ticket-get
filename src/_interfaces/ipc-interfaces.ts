export interface IPCMessage {
  source: string
  destination: string
  name: string
  guid: string
  payload: any
  direction: string
}

export interface ProcessInfo {
  path: string
  name: string
  args: string[]
  env: { [key: string]: string }
  debug: boolean
  debugPort: number
  autoRestartTime: number
  startBrk: boolean
}