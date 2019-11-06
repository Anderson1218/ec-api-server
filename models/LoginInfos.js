const db = require("../firebase/firebase-admin");

const loginInfosRef = db.collection("loginInfos");

module.exports = loginInfosRef;
