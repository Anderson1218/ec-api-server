const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", (req, res) => {
  console.log("got data from front-end", req.body);
  res.json("signup api");
});

router.post("/signin", (req, res) => {
  console.log("got data from front-end", req.body);
  res.json("signin api");
});

router.get("/signout", (req, res) => {
  res.json("signout api");
});

module.exports = router;
