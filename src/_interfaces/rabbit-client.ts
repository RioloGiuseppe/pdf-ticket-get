import { EventEmitter } from "events"

export interface LoginChallenge {
  userId: string
  sign?: string
  data?: string
}

export interface LoginResponse {
  token: string
  userId: string
}

export interface IMessage {
  action: string
  payload: string
}