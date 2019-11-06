const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/", usersController.signup);

router.post("/token", usersController.signin);

router.get("/reset", (req, res) => {
  res.json("sign out api");
});

module.exports = router;
