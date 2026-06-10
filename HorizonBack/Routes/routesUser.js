const express = require("express");
const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/user");
const {
  userGetAll,
  getUserById,
  createUser,
  patchUser,
  deleteUser,
} = require("../controllers/userController");

const routerUser = Router();

routerUser.get("/", verifyToken, userGetAll);
routerUser.get("/:id", verifyToken, getUserById);
routerUser.post("/", verifyToken, createUser);
routerUser.put("/:id", verifyToken, patchUser);
routerUser.delete("/:id", verifyToken, deleteUser);

module.exports = routerUser;
