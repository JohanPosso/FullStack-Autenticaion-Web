const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Role = sequelize.define("Role", {
  id_role: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Role;
