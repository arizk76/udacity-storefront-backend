import express, { Application, Request, Response } from 'express';
import usersRoutes from './api/v1/users';
import productsRoutes from './api/v1/products';
import ordersRoutes from './api/v1/orders';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const app: Application = express();
app.use(bodyParser.json());
app.use(helmet());

const port = 5000;
const host = 'localhost';

app.listen(port, host, () =>
    console.log('Server ' + host + ' is listening on port ' + port)
);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Server is running successfully!!');
});

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

export default app;
