const Part = require("./Part");
const Ship = require("./Ship");
const User = require("./User");

User.hasMany(Part, { foreignKey: "UserId" });
Part.belongsTo(User, { foreignKey: "UserId" });
User.hasOne(Ship, { foreignKey: "CaptainId" });
Ship.belongsTo(User, { foreignKey: "CaptainId" });
