import { getAll } from '../controllers/products.js';

import express from 'express';
export const routerProducts = express.Router();

routerProducts.get('/', getAll);
