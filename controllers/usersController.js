const UsersRef = require("../models/Users");
const LoginInfosRef = require("../models/LoginInfos");
const db = require("../firebase/firebase-admin");
const bcrypt = require("bcryptjs");

exports.validateSignup = () => {};

exports.signup = async (req, res) => {
  //should be changed to use Transaction, cus "where("email", "==", email).get();" should be read before write
  try {
    const { email, name, password } = req.body;
    let snapshot = await UsersRef.where("email", "==", email).get();
    if (snapshot.empty) {
      const batch = db.batch();
      const hash = await bcrypt.hash(password, 8);
      const createdAt = new Date();
      let newUser = {
        email,
        name,
        createdAt
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
      return res.json("email has already been used");
    }
  } catch (error) {
    console.log("some error happend in signup controller", error);
    return res.status(400).send();
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let snapshot = await LoginInfosRef.where("email", "==", email)
      .limit(1)
      .get();
    if (snapshot.empty) {
      return res.json("user doesn't exist!");
    } else {
      let userLoginInfo = snapshot.docs[0].data();
      const isMatch = await bcrypt.compare(password, userLoginInfo.hash);
      if (!isMatch) {
        return res.json("Unable to login");
      }

      //if password is matched => create JWT token
      const userSnapshot = await UsersRef.where("email", "==", email).get();
      const user = userSnapshot.docs[0].data();
      return res.json(user);
    }
  } catch (error) {
    console.log("some error happend in signin controller", error);
    return res.status(400).send();
  }
};

exports.signout = () => {};

exports.checkAuth = () => {};
