const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const User = require("./user.model");
const Photo = sequelize.define("Photo", {
  id_photo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ph_reference: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Photo;
