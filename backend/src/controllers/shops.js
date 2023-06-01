import { getAllShops } from '../servises/shops.js';

export const getAll = async(req, res) => {
  try {
    const shops = await getAllShops();
    res.send(shops);
  } catch (error) {
    res.status(500).send(`Internal server error: ${error}`);
  }
};

