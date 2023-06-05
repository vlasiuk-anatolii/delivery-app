import { sequelize } from '../utils/db.js';

import { DataTypes } from 'sequelize';

export const Shop = sequelize.define('Shop', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  href: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  iconurl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
  lat: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },

  lng: {
    type: DataTypes.NUMBER,
    allowNull: true,
  }, 
}, {
  tableName: 'shops',
});

export async function getAllShops() {
    try {
      const result = await Shop.findAll();
      return result;
    } catch (error) {
      return error;
    }
}


