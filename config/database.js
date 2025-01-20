const { Sequelize } = require("sequelize");
require("dotenv").config();

const isTestEnv = process.env.NODE_ENV === "test";

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

module.exports = sequelize;
