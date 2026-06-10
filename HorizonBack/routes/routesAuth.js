const express = require("express");
const { Router } = require("express");
const { register, login } = require("../controllers/authController");

const routerAuth = Router();

routerAuth.post("/register", register);
routerAuth.post("/login", login);

module.exports = routerAuth;
