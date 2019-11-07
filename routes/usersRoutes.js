const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const auth = require("../middlewares/auth");

//signup
router.post("/", usersController.signup);

//# signin
router.post("/token", usersController.signin);

//# Profile of logged in user
router.get("/me", auth, usersController.getUserProfile);

//sign out
router.delete("/session", (req, res) => {
  res.json("sign out api");
});

module.exports = router;
