const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Like = sequelize.define("Like", {
  id_like: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  like_cantidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Like;
