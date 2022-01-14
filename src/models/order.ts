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
    async show(id: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql =
                "SELECT * FROM orders WHERE user_id=($1) AND order_status='active'";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Unable to show the current order by User ${id}. Error: ${err}`
            );
        }
    }
}
