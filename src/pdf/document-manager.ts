import { generate } from 'shortid'
import { promises, unlink } from 'fs'
import { PDFCreator } from "./pdf-creator"
import { exec } from "child_process"
import { PrinterDataBase } from '../_interfaces/printer-documents'
import { Logger } from '../logger'
import { DatabaseManager } from '../database-manager'
import 'colors'


const RX_NAME = /([^a-zA-Z0-9.\-])/gmi

export class DocumentManager {

  private _database: DatabaseManager

  constructor(database: DatabaseManager) {
    this._database = database
  }

  public print(data: PrinterDataBase) {
    let printer = ''
    if (data.destination === 'kitchen') printer = this._database.settings.kitchenDefaultPrinter
    let root = `/usr/share/cups/data`
    let fname = generate()
    let fpdf = `${fname}.pdf`
    let hsize = 0
    promises.writeFile(`${root}/${fname}`, `#PDF-BANNER\nTemplate ${fpdf}\n\n`)

    if (data.type === 'order-kcn') hsize = PDFCreator.printKitchenOrder(`${root}/${fpdf}`, data.content)

    let p = printer.replace(RX_NAME, '_').replace(/(_+)/gmi, '_')
    if (p === '')
      Logger.error("Default printer not set for kitchen!")

    const cmd = `lp -d ${p} -o media=Custom.80x${hsize}mm ${root}/${fname}`
    setTimeout(() => {
      const result = exec(cmd, (error, stdout, stderr) => {
        if (error) {
          Logger.error(`DocumentManager::Print ${(error.message).red}`)
          return
        }
        //unlink(`${root}/${fname}`, () => { });
        //unlink(`${root}/${fpdf}`, () => { });
      })
    }, 1000)
  }
}
