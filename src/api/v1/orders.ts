import express, { Request, Response } from 'express';
import verifyAuth from '../../middleware/jwtAuth';
import { Order, OrderStore } from '../../models/order';
import dotenv from 'dotenv';

dotenv.config();
const store = new OrderStore();

const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id;
    const productId: string = _req.body.productId;
    const quantity: number = parseInt(_req.body.quantity);

    try {
        const addedProduct = await store.addProduct(
            quantity,
            orderId,
            productId
        );
        res.json(addedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const ordersRoutes = (app: express.Application) => {
    // app.get('/api/v1/orders', index);
    // app.get('/api/v1/orders/:id', show);
    // app.post('/api/v1/orders', create);
    // add product
    app.post('/api/v1/orders/:id/products', verifyAuth, addProduct);
};

export default ordersRoutes;
