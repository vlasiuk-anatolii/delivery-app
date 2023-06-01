import { sequelize } from '../utils/db.js';

import { DataTypes } from 'sequelize';

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },

  idshop: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },

  discount: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },

  imageurl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'products',
});

export async function getAllProducts() {
  try {
    const result = await Product.findAll();
    return result;
  } catch (error) {
    return error;
  }
}

