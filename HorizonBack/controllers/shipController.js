const Ship = require("../models/Ship");

const shipGetAll = async (req, res, next) => {
  try {
    const ships = await Ship.findAll();
    res.json(ships);
  } catch (err) {
    next(err);
  }
};

const getShipById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ship = await Ship.findByPk(id);
    if (!ship) return res.status(404).json({ error: "Not found." });
    res.json(ship);
  } catch (err) {
    next(err);
  }
};

const createShip = async (req, res, next) => {
  try {
    const { cockpit, portWing, starboardWing, hull, thruster, captainId } =
      req.body;
    const ship = await Ship.create({
      cockpit,
      portWing,
      starboardWing,
      hull,
      thruster,
      captainId,
    });
    res.json(ship);
  } catch (err) {
    next(err);
  }
};

const patchShip = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ship = await Ship.findByPk(id);
    if (!ship) return res.status(404).json({ error: "Not found." });
    await ship.update(req.body);
    res.json(ship);
  } catch (err) {
    next(err);
  }
};

const deleteShip = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ship = await Ship.destroy({ where: { id } });
    if (!ship) return res.status(404).json({ error: "Not found." });
    res.json("Ship successfully removed.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  shipGetAll,
  getShipById,
  createShip,
  patchShip,
  deleteShip,
};
