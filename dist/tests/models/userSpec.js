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
const user_1 = require("../../models/user");
const store = new user_1.UserStore();
describe('User Model Test', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield store.create({
            user_name: 'admin1',
            first_name: 'adminFirst',
            last_name: 'adminLast',
            password: 'password@1234',
        });
    }));
    it('User model should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('User create should add user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            user_name: 'test_name',
            first_name: 'first_name',
            last_name: 'last_name',
            password: 'password@1234',
        });
        expect(result.user_name).toEqual('test_name');
        expect(result.first_name).toEqual('first_name');
        expect(result.last_name).toEqual('last_name');
    }));
    it('User model should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('User index should return users successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    }));
    it('User model should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('User model should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });
});
