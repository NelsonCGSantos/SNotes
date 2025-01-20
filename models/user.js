'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Note, { foreignKey: 'ownerId', as: 'notes' }); // User owns many notes
      User.belongsToMany(models.Note, { through: models.SharedNote, foreignKey: 'sharedWithUserId', as: 'sharedNotes' }); // Many-to-Many via SharedNote
    }
  }

  User.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
  });

  return User;
};
