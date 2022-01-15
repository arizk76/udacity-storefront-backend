"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const store = new order_1.OrderStore();
describe('Order Model Test', () => {
    it('Order model should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('Order model should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('Order model should have show method', () => {
        expect(store.show).toBeDefined();
    });
    it('Order model should have a showByUserId method', () => {
        expect(store.showByUserId).toBeDefined();
    });
    it('Order model should have an addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    });
});
