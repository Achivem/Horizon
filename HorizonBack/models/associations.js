const Part = require("./Part");
const Ship = require("./Ship");
const User = require("./User");

User.hasMany(Part, { foreignKey: "userId" });
Part.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Ship, { foreignKey: "captainId" });
Ship.belongsTo(User, { foreignKey: "captainId" });
