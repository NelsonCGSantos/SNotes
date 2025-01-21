"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Note extends Model {
    static associate(models) {
      // Define association with User
      Note.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user", // Alias for the user relationship
      });
    }
  }

  Note.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" }, // Foreign key
        field: "userId", // Ensure Sequelize uses the correct column name
      },
    },
    {
      sequelize,
      modelName: "Note",
      tableName: "Notes",
      timestamps: true,
    }
  );

  return Note;
};
