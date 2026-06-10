require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const routerPart = require("./routes/routesPart");
const routerShip = require("./routes/routesShip");
const routerUser = require("./routes/routesUser");
const routerAuth = require("./routes/routesAuth");
const errorHandler = require("./middlewares/errorHandler");
require("./models/Associations");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/parts", routerPart);
app.use("/ships", routerShip);
app.use("/user", routerUser);
app.use("/auth", routerAuth);

app.use(errorHandler);

async function main() {
  await sequelize.sync({ force: true });
  console.log("Se vincularon las tablas.");
  app.listen(8000, () =>
    console.log("Server online on port http://localhost:8000"),
  );
}

main();
