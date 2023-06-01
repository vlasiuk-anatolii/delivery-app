import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize ('Products', 'postgres', '1711', {
  host: 'localhost',
  dialect: 'postgres',
});
