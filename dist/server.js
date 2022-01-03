"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
const port = 5000;
const host = 'localhost';
app.listen(port, host, () => console.log('Server ' + host + ' is listening on port ' + port));
app.get('/', (req, res) => {
    res.status(200).send('Server is running successfully!!');
});
exports.default = app;
