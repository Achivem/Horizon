const express = require("express");
const { Router } = require("express");
const { register, login, validate } = require("../controllers/authController");

const routerAuth = Router();

routerAuth.post("/register", register);
routerAuth.post("/login", login);
routerAuth.post("/validate", validate);

module.exports = routerAuth;
