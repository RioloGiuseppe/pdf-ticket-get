"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentManager = void 0;
const shortid_1 = require("shortid");
const fs_1 = require("fs");
const pdf_creator_1 = require("./pdf-creator");
const child_process_1 = require("child_process");
const logger_1 = require("../logger");
require("colors");
const RX_NAME = /([^a-zA-Z0-9.\-])/gmi;
class DocumentManager {
    constructor(database) {
        this._database = database;
    }
    print(data) {
        let printer = '';
        if (data.destination === 'kitchen')
            printer = this._database.settings.kitchenDefaultPrinter;
        let root = `/usr/share/cups/data`;
        let fname = shortid_1.generate();
        let fpdf = `${fname}.pdf`;
        let hsize = 0;
        fs_1.promises.writeFile(`${root}/${fname}`, `#PDF-BANNER\nTemplate ${fpdf}\n\n`);
        if (data.type === 'order-kcn')
            hsize = pdf_creator_1.PDFCreator.printKitchenOrder(`${root}/${fpdf}`, data.content);
        let p = printer.replace(RX_NAME, '_').replace(/(_+)/gmi, '_');
        if (p === '')
            logger_1.Logger.error("Default printer not set for kitchen!");
        const cmd = `lp -d ${p} -o media=Custom.80x${hsize}mm ${root}/${fname}`;
        setTimeout(() => {
            const result = child_process_1.exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    logger_1.Logger.error(`DocumentManager::Print ${(error.message).red}`);
                    return;
                }
                //unlink(`${root}/${fname}`, () => { });
                //unlink(`${root}/${fpdf}`, () => { });
            });
        }, 1000);
    }
}
exports.DocumentManager = DocumentManager;
//# sourceMappingURL=document-manager.js.map