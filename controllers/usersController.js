const UsersRef = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwtUtils = require("../utils/jwt-utils");
const omit = require("lodash/omit");

exports.signup = async (req, res) => {
  try {
    const { email, name, password, photoURL } = req.body;
    if (!email || !password || !name) {
      throw new Error("email , name and password shouldn't be empty");
    }
    let snapshot = await UsersRef.where("email", "==", email).get();
    if (snapshot.empty) {
      const hash = await bcrypt.hash(password, 8);
      const createdAt = new Date();
      const newUser = {
        email,
        name,
        createdAt,
        photoURL,
        password: hash
      };
      await UsersRef.add(newUser);
      return res.json("signup success");
    } else {
      throw new Error("email has already been used");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("email and password shouldn't be empty");
    }
    let querySnapshot = await UsersRef.where("email", "==", email)
      .limit(1)
      .get();
    if (querySnapshot.empty) {
      throw new Error("the user doesn't exist!");
    } else {
      const userSnapshot = querySnapshot.docs[0];
      const user = userSnapshot.data();
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("the password is wrong");
      }
      const token = await jwtUtils.generateAuthToken(userSnapshot.id);
      const userProfile = omit(user, ["password"]);
      return res.json({ user: userProfile, token });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { user } = req;
    if (user) {
      return res.json(user);
    } else {
      throw new Error("unable to get the profile");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.signout = () => {};
