const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Part extends Model {}

Part.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is obligatory." },
        notEmpty: { msg: "Name cannot be empty." },
      },
    },
    value: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: { msg: "Value must be a number." },
        min: { args: [0.01], msg: "Value must be greater than 0." },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { msg: "Stock must be a full number." },
      },
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["Cockpit", "Wing", "Hull", "Thruster"]],
          msg: "Type must be Cockpit, Wing, Hull or Thruster.",
        },
      },
    },
    icon: {
      type: DataTypes.BLOB(medium),
      allowNull: false,
      validate: {
        notNull: { msg: "Icon is obligatory." },
        notEmpty: { msg: "Icon cannot be empty." },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "Description is obligatory." },
        notEmpty: { msg: "Description cannot be empty." },
      },
    },
  },
  { sequelize, modelName: "part" },
);

module.exports = Part;
