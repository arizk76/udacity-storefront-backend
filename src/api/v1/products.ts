import express, { Request, Response } from 'express';
import verifyAuth from '../../middleware/jwtAuth';
import { Product, ProductStore } from '../../models/product';

import dotenv from 'dotenv';

dotenv.config();
const store = new ProductStore();

//Create handler api endpoint that return new created product.
const create = async (req: Request, res: Response): Promise<Product | void> => {
    try {
        const createProduct: Product = {
            name: req.body.name,
            price: req.body.price,
        };
        // console.log(createProduct);
        const newProduct = await store.create(createProduct);
        // console.log(newProduct);
        res.json(newProduct);
    } catch (error) {
        res.status(409);
        res.json(error);
    }
};
//Index handler api endpoint that return list of all  Products.
const index = async (_req: Request, res: Response) => {
    try {
        const products: Product[] = await store.index();
        res.json(products);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};
// Show handler that return only requested Product by id
const show = async (req: Request, res: Response) => {
    try {
        const product: Product = await store.show(req.body.id);
        if (!product) {
            res.status(409);
            res.json(
                `No product found with ID ${req.body.id} ,please check requested ID and try again.`
            );
        }
        res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const productsRoutes = (app: express.Application) => {
    app.post('/api/v1/products', verifyAuth, create);
    app.get('/api/v1/products', index);
    app.get('/api/v1/products/:id', show);
};
export default productsRoutes;
