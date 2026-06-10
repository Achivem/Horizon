const User = require("../models/User");

const userGetAll = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "Not found." });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, birthdate, faction, balance, role } =
      req.body;
    const user = await User.create({
      name,
      email,
      password,
      birthdate,
      faction,
      balance,
      role,
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const patchUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "Not found." });
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });
    if (!user) return res.status(404).json({ error: "Not found." });
    res.json("User successfully removed.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  userGetAll,
  getUserById,
  createUser,
  patchUser,
  deleteUser,
};
