export interface PrinterDataBase {
  type: string
  destination: string
  content: any
}

export interface PrinterData<T> extends PrinterDataBase {
  content: T
}

export interface PrinterOrder {
  title: string
  lines: PrinterOrderLine[]
}

export interface PrinterOrderLine {
  name: string
  amount: string
  position: string
}