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
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const store = new product_1.ProductStore();
describe('Product Model Test', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield store.create({
            name: 'ProductTest',
            price: 40,
        });
    }));
    it('Product model should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('Product create should add Product successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            name: 'productName',
            price: 60,
        });
        expect(result.name).toEqual('productName');
        expect(result.price).toEqual(60);
    }));
    it('Product model should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('Product index should return products successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    }));
    it('Product model should have a show method', () => {
        expect(store.show).toBeDefined();
    });
});
