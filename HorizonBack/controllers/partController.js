const Part = require("../models/Part");

const partGetAll = async (req, res, next) => {
  try {
    const parts = await Part.findAll();
    res.json(parts);
  } catch (err) {
    next(err);
  }
};

const getPartById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const part = await Part.findByPk(id);
    if (!part) return res.status(404).json({ error: "Not found." });
    res.json(part);
  } catch (err) {
    next(err);
  }
};

const createPart = async (req, res, next) => {
  try {
    const { name, value, stock, type, icon, description, userId } = req.body;
    const part = await Part.create({
      name,
      value,
      stock,
      type,
      icon,
      description,
      userId,
    });
    res.json(part);
  } catch (err) {
    next(err);
  }
};

const patchPart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const part = await Part.findByPk(id);
    if (!part) return res.status(404).json({ error: "Not found." });
    await part.update(req.body);
    res.json(part);
  } catch (err) {
    next(err);
  }
};

const deletePart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const part = await Part.destroy({ where: { id } });
    if (!part) return res.status(404).json({ error: "Not found." });
    res.json("Part successfully removed.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  partGetAll,
  getPartById,
  createPart,
  patchPart,
  deletePart,
};
