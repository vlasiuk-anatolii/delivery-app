import { routerShops } from './routes/shops.js';
import { routerProducts } from './routes/products.js';
import { routerOrders } from './routes/orders.js';
import bodyParser from 'body-parser';

import cors from 'cors';

import express from 'express';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/shops', routerShops);
app.use('/products', routerProducts);
app.use('/orders', routerOrders);

export const server = app.listen(5000, () => {
  console.log('Server listening on port 5000')
});


