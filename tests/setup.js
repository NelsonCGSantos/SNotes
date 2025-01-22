require("dotenv").config();
const { sequelize } = require("../models");

beforeAll(async () => {
  console.log("🔹 Connecting to Database...");
  await sequelize.authenticate();
  console.log("✅ Database connected.");
});

afterAll(async () => {
  console.log("🛑 Closing database connection...");
  await sequelize.close();
});
