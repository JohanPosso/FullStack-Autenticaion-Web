const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Role = require("./role.model");
const Photo = require("./photo.model");
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  imgProfile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Role.hasOne(User);
// User.hasMany(Photo);
Photo.belongsTo(User);

module.exports = User;
