import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import verifyAuth from '../../middleware/jwtAuth';
import { User, UserStore } from '../../models/user';
import dotenv from 'dotenv';

dotenv.config();
let token = '';
const store = new UserStore();

//Create handler api endpoint that return new created user.
const create = async (req: Request, res: Response): Promise<User | void> => {
    try {
        const createUser: User = {
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
        };
        const newUser = await store.create(createUser);
        if (process.env.TOKEN_SECRET) {
            token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
            res.json(token);
        }
    } catch (error) {
        res.status(409);
        res.json(error);
    }
};
//Index handler api endpoint that return list of all  users.
const index = async (_req: Request, res: Response) => {
    try {
        const users: User[] = await store.index();
        res.json(users);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};
// Show handler that return only requested user by id
const show = async (req: Request, res: Response) => {
    try {
        const user: User = await store.show(parseInt(req.params.id));
        if (!user) {
            res.status(409);
            res.json(
                `No user found with ID ${req.params.id} ,please check requested ID and try again.`
            );
        }
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const usersRoutes = (app: express.Application) => {
    // To create admin first without token
    app.post('/api/v1/users/admin', create);
    // Routes for users not admins
    app.get('/api/v1/users', verifyAuth, index);
    app.post('/api/v1/users', verifyAuth, create);
    app.get('/api/v1/users/:id', verifyAuth, show);
};
export default usersRoutes;
