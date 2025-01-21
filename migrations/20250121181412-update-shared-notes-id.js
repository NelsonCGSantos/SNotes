"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the current primary key constraint
    await queryInterface.removeConstraint("SharedNotes", "SharedNotes_pkey");

    // Change id column from INTEGER to UUID
    await queryInterface.changeColumn("SharedNotes", "id", {
      type: Sequelize.UUID,
      defaultValue: Sequelize.fn("gen_random_uuid"),
      allowNull: false,
      primaryKey: true,
    });

    // Recreate the primary key constraint
    await queryInterface.addConstraint("SharedNotes", {
      fields: ["id"],
      type: "primary key",
      name: "SharedNotes_pkey",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert changes if needed
    await queryInterface.removeConstraint("SharedNotes", "SharedNotes_pkey");
    await queryInterface.changeColumn("SharedNotes", "id", {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    });
    await queryInterface.addConstraint("SharedNotes", {
      fields: ["id"],
      type: "primary key",
      name: "SharedNotes_pkey",
    });
  },
};
