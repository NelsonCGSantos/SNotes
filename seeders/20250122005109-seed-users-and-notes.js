"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if users exist before inserting (Avoid duplicates)
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 1;`
    );

    if (users[0].length === 0) {
      const hashedPassword = await bcrypt.hash("password123", 10);

      await queryInterface.bulkInsert("Users", [
        {
          id: "f3a1b3c5-1234-5678-90ab-cdef12345678", // Static UUID to prevent conflicts
          username: "testuser",
          email: "test@example.com",
          password: hashedPassword,
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    // Check if notes exist before inserting
    const notes = await queryInterface.sequelize.query(
      `SELECT id FROM "Notes" LIMIT 1;`
    );

    if (notes[0].length === 0) {
      await queryInterface.bulkInsert("Notes", [
        {
          id: "e13a2b4c-5678-90ab-cdef-1234567890ab",
          title: "Sample Note",
          content: "This is a seeded note for testing.",
          userId: "f3a1b3c5-1234-5678-90ab-cdef12345678",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback seeded data (optional)
    await queryInterface.bulkDelete("Notes", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
