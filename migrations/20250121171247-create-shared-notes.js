"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SharedNotes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      noteId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Notes", // Ensure this matches the name of the Notes table
          key: "id",
        },
        onDelete: "CASCADE", // Delete shared notes if the note is deleted
      },
      sharedWithUserId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users", // Ensure this matches the name of the Users table
          key: "id",
        },
        onDelete: "CASCADE", // Delete shared notes if the user is deleted
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("SharedNotes");
  },
};
