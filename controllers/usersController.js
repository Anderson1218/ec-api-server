const UsersRef = require("../models/Users");
const LoginInfosRef = require("../models/LoginInfos");
const db = require("../firebase/firebase-admin");
const bcrypt = require("bcryptjs");
const jwtUtils = require("../utils/jwt-utils");

exports.signup = async (req, res) => {
  try {
    const { email, name, password, photoURL } = req.body;
    if (!email || !password || !name) {
      throw new Error("email , name and password shouldn't be empty");
    }
    let snapshot = await UsersRef.where("email", "==", email).get();
    if (snapshot.empty) {
      const batch = db.batch();
      const hash = await bcrypt.hash(password, 8);
      const createdAt = new Date();
      let newUser = {
        email,
        name,
        createdAt,
        photoURL
      };
      let newUserLoginInfo = {
        email,
        hash
      };
      const userRef = UsersRef.doc();
      const LoginInfoRef = LoginInfosRef.doc();
      batch.set(userRef, newUser);
      batch.set(LoginInfoRef, newUserLoginInfo);
      await batch.commit();
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
    let snapshot = await LoginInfosRef.where("email", "==", email)
      .limit(1)
      .get();
    if (snapshot.empty) {
      throw new Error("the user doesn't exist!");
    } else {
      let userLoginInfo = snapshot.docs[0].data();
      const isMatch = await bcrypt.compare(password, userLoginInfo.hash);
      if (!isMatch) {
        throw new Error("the password is wrong");
      }
      const usersSnapshot = await UsersRef.where("email", "==", email).get();
      const userSnapshot = usersSnapshot.docs[0];
      const user = userSnapshot.data();
      const token = await jwtUtils.generateAuthToken(userSnapshot.id);
      return res.json({ user, token });
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
