const db = require("../firebase/firebase-admin");

const collectionRef = db.collection("collections");

module.exports = collectionRef;
