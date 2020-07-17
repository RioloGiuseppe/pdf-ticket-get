export interface RabbitConfig {
  username?: string
  deviceName?: string
  deviceId?: string
  privateKey?: string
  password?: string
  host?: string
  authExchange?: string
  printerExchange?: string
  messageExchange?: string
  errorExchange?: string
  configExchange?: string
  authChallengeTopic?: string
  authTokenTopic?: string
  printerTopic?: string
  errorsTopic?: string
  toServerMessageTopic?: string
  toDeviceMessageTopic?: string
}