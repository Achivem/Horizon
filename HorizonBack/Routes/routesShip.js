const express = require("express");
const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken");
const Ship = require("../models/ship");
const {
  shipGetAll,
  getShipById,
  createShip,
  patchShip,
  deleteShip,
} = require("../controllers/shipController");

const routerShip = Router();

routerShip.get("/", verifyToken, shipGetAll);
routerShip.get("/:id", verifyToken, getShipById);
routerShip.post("/", verifyToken, createShip);
routerShip.put("/:id", verifyToken, patchShip);
routerShip.delete("/:id", verifyToken, deleteShip);

module.exports = routerShip;
