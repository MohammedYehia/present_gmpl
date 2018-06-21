import Sequelize from 'sequelize';
import env2 from 'env2';

env2('./config.env');

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_DIALECT,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: DB_DIALECT,
  operatorsAliases: false,
  host: process.env.HOSTNAME || 'localhost',
  define: {
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const models = {};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
