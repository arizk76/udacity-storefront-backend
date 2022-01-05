import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
    id?: number;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
};

export class UserStore {
    // create a new user token required
    async create(u: User): Promise<User> {
        try {
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );
            console.log(hash);
            const conn = await Client.connect();
            const sql = `INSERT INTO users (user_name, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *`;

            const result = await conn.query(sql, [
                u.user_name,
                u.first_name,
                u.last_name,
                hash,
            ]);
            // console.log(result);
            const user = result.rows[0];

            conn.release();

            return user;
        } catch (err) {
            throw new Error(`unable create user (${u.user_name}): ${err}`);
        }
    }
    // index list of all users token required
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql =
                'SELECT id, user_name, first_name, last_name FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    //show user by id token required.
    async show(id: number): Promise<User> {
        try {
            const sql =
                'SELECT id, user_name, first_name, last_name FROM users WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Can not get user with the ID ${id}. Error: ${error}`
            );
        }
    }

    async authenticate(
        loginId: string,
        password: string
    ): Promise<User | null> {
        const conn = await Client.connect();
        const sql = 'SELECT password FROM users WHERE user_name=($1)';

        const result = await conn.query(sql, [loginId]);

        console.log(password + pepper);

        if (result.rows.length) {
            const user = result.rows[0];

            console.log(user);

            if (bcrypt.compareSync(password + pepper, user.password_digest)) {
                return user;
            }
        }

        return null;
    }
}
