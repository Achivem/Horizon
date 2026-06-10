const { expressjwt } = require("express-jwt");

const verifyToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

module.exports = verifyToken;
