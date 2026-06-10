const express = require("express");
const { Router } = require("express");
const { register, login } = require("../controllers/authController");

const routerAuth = express.router();

routerAuth.get("/", register);
routerAuth.get("/", login);

module.exports = routerAuth;
