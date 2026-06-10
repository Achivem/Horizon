const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Ship extends Model {}

Ship.init(
  {
    cockpit: {
      type: DataTypes.STRING,
      validate: {
        checkPart(value) {
          if (value.type !== "Cockpit") {
            throw new Error("Must be a valid cockpit part.");
          }
        },
      },
    },
    portWing: {
      type: DataTypes.STRING,
      validate: {
        checkPart(value) {
          if (value.type !== "Wing") {
            throw new Error("Must be a valid wing part.");
          }
        },
      },
    },
    starboardWing: {
      type: DataTypes.STRING,
      validate: {
        checkPart(value) {
          if (value.type !== "Wing") {
            throw new Error("Must be a valid wing part.");
          }
        },
      },
    },
    hull: {
      type: DataTypes.STRING,
      validate: {
        checkPart(value) {
          if (value.type !== "Hull") {
            throw new Error("Must be a valid hull part.");
          }
        },
      },
    },
    thruster: {
      type: DataTypes.STRING,
      validate: {
        checkPart(value) {
          if (value.type !== "Thruster") {
            throw new Error("Must be a valid thruster part.");
          }
        },
      },
    },
  },
  { sequelize, modelName: "ship" },
);

module.exports = Ship;
