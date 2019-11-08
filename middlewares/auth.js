const jwtUtiles = require("../utils/jwt-utils");
const UsersRef = require("../models/Users");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = await jwtUtiles.verifyAuthToken(token);
    const userDoc = await UsersRef.doc(decodedToken.id).get();
    const user = userDoc.data();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Please authenticate");
  }
};

module.exports = auth;
