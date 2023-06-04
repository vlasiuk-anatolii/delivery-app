import { sequelize } from '../utils/db.js';

import { DataTypes } from 'sequelize';

export const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  phone: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  order: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  total: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'orders',
});

export async function getAllOrders() {
  try {
    const result = await Order.findAll();
    return result;
  } catch (error) {
    return error;
  }
}

export async function insertOrder(
  id,
  name,
  email,
  phone,
  order,
  total,
  address
) {
  try {
    const userOrder = await Order.create({
      id:`${id}`,
      name: `${name}`,
      email: `${email}`,
      phone: `${phone}`,
      order: JSON.stringify(order),
      total: `${total}`,
      address: `${address}`,
    });

    return userOrder;
  } catch (error) {
    return error;
  }
}


