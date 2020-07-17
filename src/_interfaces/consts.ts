export const AREA_DEVICE = 0x00
export const AREA_LED = 0x01
export const AREA_BTN = 0x02
export const AREA_OLED = 0x03
export const AREA_BLE = 0x04

export const READY = 0x00
export const HEARTBEAT = 0x01
export const VERSION = 0x02
export const MAC_ADDRESS = 0x03

export const OFF = 0x00
export const ON = 0x01
export const BLINK = 0x02
export const FLASH = 0x03

export const CLICK = 0x00
export const DCLCK = 0x01
export const LCLCK = 0x02

export const CLEAR = 0x02
export const FONT = 0x03
export const TEXT = 0x04
export const PIXEL = 0x05
export const LINE = 0x06
export const DRECT = 0x07
export const FRECT = 0x08
export const QRCODE = 0x09
export const CONTRAST = 0xA0
export const ORIENTATION = 0xA1
export const REFRESH = 0xF0

export const NAME = 0x02
export const BLEDATA_OUT = 0x03
export const BLE_CHALLENGE = 0x04

//export const PORT: string = "COM4"
export const PORT: string = "/dev/ttyS1"
export const BAUD: number = 19200
export const RESET: number = 0
export const FALLING_TIME = 500