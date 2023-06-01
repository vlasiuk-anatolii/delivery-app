import { getAllProducts } from '../servises/products.js';

export const getAll = async(req, res) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    res.status(500).send(`Internal server error: ${error}`);
  }
};
