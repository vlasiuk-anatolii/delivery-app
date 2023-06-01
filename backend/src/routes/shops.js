import { getAll } from '../controllers/shops.js';
import express from 'express';

export const routerShops = express.Router();

routerShops.get('/', getAll);
