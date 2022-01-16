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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class OrderStore {
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (order_status, user_id) VALUES ($1, $2) RETURNING *;';
                const result = yield conn.query(sql, [
                    order.order_status,
                    order.user_id,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot create order ${err}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders;';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get orders ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id = $1;';
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length < 1) {
                    console.log(`There is no Order with ID ${id}`);
                }
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot get order ${err}`);
            }
        });
    }
    showByUserId(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id = $1;';
                const result = yield conn.query(sql, [userID]);
                conn.release();
                if (result.rows.length < 1) {
                    console.log(`There is no Order with User ID ${userID}`);
                }
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot get order ${err}`);
            }
        });
    }
    addProduct(quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [
                    quantity,
                    orderId,
                    productId,
                ]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
