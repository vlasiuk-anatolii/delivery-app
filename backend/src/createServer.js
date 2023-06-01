import { routerShops } from './routes/shops.js';
import { routerProducts } from './routes/products.js';

import cors from 'cors';

import express from 'express';
const app = express();
app.use(cors());

app.use('/shops', routerShops);
app.use('/products', routerProducts);

export const server = app.listen(5000, () => {
  console.log('Server listening on port 5000')
});


