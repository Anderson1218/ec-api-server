const db = require("../firebase/firebase-admin");

const usersRef = db.collection("users");

module.exports = usersRef;
