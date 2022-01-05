"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtAuth_1 = __importDefault(require("../../middleware/jwtAuth"));
const order_1 = require("../../models/order");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new order_1.OrderStore();
const addProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = _req.params.id;
    const productId = _req.body.productId;
    const quantity = parseInt(_req.body.quantity);
    try {
        const addedProduct = yield store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const ordersRoutes = (app) => {
    // app.get('/api/v1/orders', index);
    // app.get('/api/v1/orders/:id', show);
    // app.post('/api/v1/orders', create);
    // add product
    app.post('/api/v1/orders/:id/products', jwtAuth_1.default, addProduct);
};
exports.default = ordersRoutes;
