const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Ship = require("../models/Ship");

const register = async (req, res, next) => {
  try {
    const { name, password, email, birthdate, faction, isAdmin } = req.body;
    if (!name || !password || !email || !birthdate || !faction) {
      return res.status(400).json({ error: "All fields are obligatory." });
    }
    const existing = await User.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ error: "This user already exists." });
    }
    const hashed = await bcrypt.hash(password, 12);
    let role = "";
    if (isAdmin) {
      role = "Admin";
    } else {
      role = "Customer";
    }
    const user = await User.create({
      name,
      password: hashed,
      email,
      birthdate,
      faction,
      balance: 0,
      role,
    });
    Ship.create({ captainId: user.id });
    res
      .status(201)
      .json({ message: `User ${user.name} created successfully.` });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Incorrect credentials." });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Incorrect credentials." });
    }
    const token = jwt.sign(
      { id: user.id, name: user.name, faction: user.faction },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );
    res.json({ token, name: user.name, faction: user.faction });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
