import Client from '../database';
import dotenv from 'dotenv';

dotenv.config();

export type Order = {
    id?: number;
    user_id: number;
    order_status: string;
};
export type OrderProducts = {
    id?: number;
    quantity: number;
    order_id: string | number;
    product_id: string | number;
};

export class OrderStore {
    async create(order: Order) {
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO orders (order_status, user_id) VALUES ($1, $2) RETURNING *;';
            const result = await conn.query(sql, [
                order.order_status,
                order.user_id,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create order ${err}`);
        }
    }

    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`);
        }
    }

    async show(id: number): Promise<Order | string> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id = $1;';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows.length < 1) {
                return `There is no Order with ID ${id}`;
            }
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get order ${err}`);
        }
    }

    async showByUserId(userID: number): Promise<Order | string> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = $1;';
            const result = await conn.query(sql, [userID]);
            conn.release();
            if (result.rows.length < 1) {
                return `There is no Order with User ID ${userID}`;
            }
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get order ${err}`);
        }
    }

    async addProduct(
        quantity: number,
        orderId: string | number,
        productId: string | number
    ): Promise<OrderProducts> {
        try {
            const sql =
                'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await Client.connect();

            const result = await conn.query(sql, [
                quantity,
                orderId,
                productId,
            ]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error(
                `Could not add product ${productId} to order ${orderId}: ${err}`
            );
        }
    }
}
