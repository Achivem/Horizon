const express = require("express");
const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken");
const Part = require("../models/part");
const {
  partGetAll,
  getPartById,
  createPart,
  patchPart,
  deletePart,
} = require("../controllers/partController");

const routerPart = express.router();

routerPart.get("/", verifyToken, partGetAll);
routerPart.get("/:id", verifyToken, getPartById);
routerPart.post("/", verifyToken, createPart);
routerPart.put("/:id", verifyToken, patchPart);
routerPart.delete("/:id", verifyToken, deletePart);

module.exports = routerPart;
