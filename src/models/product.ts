import Client from '../database';
import dotenv from 'dotenv';

dotenv.config();

export type Product = {
    id?: number;
    name: string;
    price: number;
};

export class ProductStore {
    // create a new product token required
    async create(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`;
            const result = await conn.query(sql, [p.name, p.price]);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (err) {
            throw new Error(`unable create product (${p.name}): ${err}`);
        }
    }
    // index list of all products token not required
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT id, name, price FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }
    //show product by id token not required.
    async show(id: number): Promise<Product> {
        try {
            const sql = 'SELECT id, name, price FROM products WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Can not get product with the ID ${id}. Error: ${error}`
            );
        }
    }
}
