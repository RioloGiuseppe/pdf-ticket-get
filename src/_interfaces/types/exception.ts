export interface Exception {
  source: string
  class: string
  callStack?: string
  message: string
  timestamp: number
}