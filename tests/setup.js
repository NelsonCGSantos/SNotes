const { sequelize } = require("../models");

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async () => {
  await sequelize.query("TRUNCATE TABLE sharedNotes RESTART IDENTITY CASCADE;");
  await sequelize.query("TRUNCATE TABLE notes RESTART IDENTITY CASCADE;");
  await sequelize.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE;");
});

afterAll(async () => {
  console.log("🔻 Closing Database Connection...");
  await sequelize.close();
});
