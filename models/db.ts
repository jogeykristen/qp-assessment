import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('grocery', 'root', 'Password123##', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;

