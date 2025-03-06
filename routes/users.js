const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Agregamos una prueba para verificar que esta ruta existe
router.get("/", (req, res) => res.json({ message: "Ruta de usuarios activa" }));

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
