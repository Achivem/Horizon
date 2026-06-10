const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is obligatory." },
        notEmpty: { msg: "Name cannot be empty." },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Email is obligatory." },
        notEmpty: { msg: "Email cannot be empty." },
      },
      unique: {
        msg: "Invalid credentials.",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is obligatory." },
        notEmpty: { msg: "Password cannot be empty." },
      },
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { msg: "Must provide a valid date." },
        isValidBirthdate(value) {
          const now = new Date();
          const minDate = new Date("1925-04-01");
          if (new Date(value) > now) {
            throw new Error("Birthdate must not be in the future.");
          }
          if (new Date(value) < minDate) {
            throw new Error("Birthdate can't be older than 100 years.");
          }
        },
      },
    },
    faction: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["Comet", "Nova", "Planet", "Quasar"]],
          msg: "Type must be Comet, Nova, Planet or Quasar.",
        },
      },
    },
    balance: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: { msg: "Balance must be a number." },
      },
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["Customer", "Admin"]],
          msg: "Role must be Customer or Admin.",
        },
      },
    },
  },
  { sequelize, modelName: "user" },
);

module.exports = User;
