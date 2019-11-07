const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8080;
const morgan = require("morgan");
const collectionsRoutes = require("./routes/collectionsRoutes");
const usersRoutes = require("./routes/usersRoutes");
/* Loads all variables from .env file to "process.env" */
require("dotenv").config();

const server = express();

server.use(cors());
server.use(morgan("short"));
server.use(express.json());
server.use("/api/users", usersRoutes);
server.use("/api/collections", collectionsRoutes);

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
