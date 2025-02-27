const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, favoritesController.addToFavorites);
router.get("/", verifyToken, favoritesController.getFavorites);

module.exports = router;