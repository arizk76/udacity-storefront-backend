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
    async addProduct(
        quantity: number,
        orderId: string,
        productId: string
    ): Promise<Order> {
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
