const express = require("express");
const router = express.Router();
const collectionsController = require("../controllers/collectionsController");

router.get("/", collectionsController.getAllCollections);
router.get("/:id", collectionsController.getCollectionById);

module.exports = router;
