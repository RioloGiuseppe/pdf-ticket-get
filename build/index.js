"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_creator_1 = require("./pdf/pdf-creator");
var a = {
    title: "tavolo",
    lines: [{
            name: "Piatto 1",
            amount: "1",
            position: "0"
        }, {
            name: "Piatto 2",
            amount: "3",
            position: "0"
        }, {
            name: "Piatto 3",
            amount: "2",
            position: "0"
        }, {
            name: "Piatto 4",
            amount: "1",
            position: "1"
        }, {
            name: "Piatto 5",
            amount: "4",
            position: "1"
        }
    ]
};
pdf_creator_1.PDFCreator.printKitchenOrder(`pippo.pdf`, a);
//# sourceMappingURL=index.js.map