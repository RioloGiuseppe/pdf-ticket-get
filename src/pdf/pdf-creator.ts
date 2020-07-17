import { createWriteStream } from 'fs'
import { PrinterOrder, PrinterOrderLine } from '../_interfaces/printer-documents'
const pdfmake = require('pdfmake')

export class PDFCreator {
  private static printer

  private static get fonts() {
    return {
      MPLUS1p: { normal: 'fonts/MPLUS1p-Regular.ttf', bold: 'fonts/MPLUS1p-Bold.ttf', italics: 'fonts/MPLUS1p-Thin.ttf', bolditalics: 'fonts/MPLUS1p-Bold.ttf' },
      Roboto: { normal: 'fonts/Roboto-Regular.ttf', bold: 'fonts/Roboto-Medium.ttf', italics: 'fonts/Roboto-Italic.ttf', bolditalics: 'fonts/Roboto-MediumItalic.ttf' }
    }
  }

  public static init(): void {
    this.printer = new pdfmake(this.fonts)
  }

  private static prepare(content: any[]) {
    return {
      pageBreakBefore: (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) =>
        currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0,
      pageSize: { width: 227, height: 'auto' },
      pageMargins: [15, 10, 15, 10],
      defaultStyle: { font: 'MPLUS1p', fontSize: 13 },
      compress: false,
      content
    }
  }

  private static group(_f: PrinterOrderLine[]): PrinterOrderLine[][] {
    return Object.values(_f.reduce(function (rv, x) {
      (rv[x.position] = rv[x.position] || []).push(x)
      return rv
    }, {} as PrinterOrderLine))
  }

  private static prepareKitchenOrder(order: PrinterOrder) {
    var lines = this.group(order.lines);
    return this.prepare([
      { text: order.title, style: { alignment: 'center', fontSize: 17 } },
      ...lines.map((o, i) => {
        return {
          layout: 'headerLineOnly',
          style: 'table',
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [["Round", (i + 1).toString()]].concat(o.map(j => [j.name, j.amount]))
          }
        }
      })
    ])
  }

  public static printKitchenOrder(fname: string, content: PrinterOrder): number {
    this.init()
    var pdfDoc = this.printer.createPdfKitDocument(this.prepareKitchenOrder(content))
    let h = Math.ceil(pdfDoc.page.height / pdfDoc.page.width * 80.0)
    pdfDoc.pipe(createWriteStream(fname))
    pdfDoc.end()
    return h < 80 ? 80 : h
  }
}