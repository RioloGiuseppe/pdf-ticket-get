"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFCreator = void 0;
const fs_1 = require("fs");
const pdfmake = require('pdfmake');
class PDFCreator {
    static get fonts() {
        return {
            MPLUS1p: { normal: 'fonts/MPLUS1p-Regular.ttf', bold: 'fonts/MPLUS1p-Bold.ttf', italics: 'fonts/MPLUS1p-Thin.ttf', bolditalics: 'fonts/MPLUS1p-Bold.ttf' },
            Roboto: { normal: 'fonts/Roboto-Regular.ttf', bold: 'fonts/Roboto-Medium.ttf', italics: 'fonts/Roboto-Italic.ttf', bolditalics: 'fonts/Roboto-MediumItalic.ttf' }
        };
    }
    static init() {
        this.printer = new pdfmake(this.fonts);
    }
    static prepare(content) {
        return {
            pageBreakBefore: (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) => currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0,
            pageSize: { width: 227, height: 'auto' },
            pageMargins: [15, 10, 15, 10],
            defaultStyle: { font: 'MPLUS1p', fontSize: 13 },
            compress: false,
            content
        };
    }
    static group(_f) {
        return Object.values(_f.reduce(function (rv, x) {
            (rv[x.position] = rv[x.position] || []).push(x);
            return rv;
        }, {}));
    }
    static prepareKitchenOrder(order) {
        var lines = this.group(order.lines);
        return this.prepare([
            { text: order.title, style: { alignment: 'center', fontSize: 15 } },
            ...lines.map((o, i) => {
                return {
                    layout: 'headerLineOnly',
                    style: 'table',
                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto'],
                        body: [["Round", (i + 1).toString()]].concat(o.map(j => [j.name, j.amount]))
                    }
                };
            })
        ]);
    }
    static printKitchenOrder(fname, content) {
        this.init();
        var pdfDoc = this.printer.createPdfKitDocument(this.prepareKitchenOrder(content));
        let h = Math.ceil(pdfDoc.page.height / pdfDoc.page.width * 80.0);
        pdfDoc.pipe(fs_1.createWriteStream(fname));
        pdfDoc.end();
        return h < 80 ? 80 : h;
    }
}
exports.PDFCreator = PDFCreator;
//# sourceMappingURL=pdf-creator.js.map