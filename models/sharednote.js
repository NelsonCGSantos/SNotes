"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class SharedNote extends Model {
    static associate(models) {
      SharedNote.belongsTo(models.User, {
        foreignKey: "sharedWithUserId",
        as: "sharedUser",
      });
      SharedNote.belongsTo(models.Note, {
        foreignKey: "noteId",
        as: "sharedNote",
      });
    }
  }

  SharedNote.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      noteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Notes", key: "id" },
        field: "noteId", // Ensure correct mapping
      },
      sharedWithUserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        field: "sharedWithUserId", // Ensure correct mapping
      },
    },
    {
      sequelize,
      modelName: "SharedNote",
      tableName: "SharedNotes",
      timestamps: true,
    }
  );

  return SharedNote;
};
