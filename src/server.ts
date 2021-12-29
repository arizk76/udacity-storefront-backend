import express, {Application, Request, Response} from 'express';
import helmet from 'helmet';

const app: Application = express();
app.use(helmet());

const port: number = 5000;
const host: string = 'localhost'

app.listen(port, host, () => console.log('Server ' + host + ' is listening on port ' + port))

app.get('/', (req:Request, res:Response) => {

  res.status(200).send("Server is running successfully!")

})

export default app;