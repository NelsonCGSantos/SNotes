"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsTo(models.User, { foreignKey: "userId", as: "owner" });
      Note.belongsToMany(models.User, {
        through: models.SharedNote,
        foreignKey: "noteId",
        as: "sharedUsers",
      }); // Many-to-Many via SharedNote
    }
  }

  Note.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "Note",
      timestamps: true,
    }
  );

  return Note;
};
