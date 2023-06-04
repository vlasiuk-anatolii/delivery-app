import { getAll, setOrder } from '../controllers/orders.js';
import express from 'express';

export const routerOrders = express.Router();

routerOrders.get('/', getAll);
routerOrders.post('/', setOrder);
