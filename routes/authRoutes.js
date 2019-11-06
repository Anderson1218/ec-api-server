const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);

router.post("/signin", authController.signin);

router.get("/signout", (req, res) => {
  res.json("signout api");
});

module.exports = router;
