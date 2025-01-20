"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class SharedNote extends Model {
    static associate(models) {
      // Define associations correctly
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
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      noteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Notes", key: "id" },
      },
      sharedWithUserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "SharedNote",
      timestamps: true,
    }
  );

  return SharedNote;
};
