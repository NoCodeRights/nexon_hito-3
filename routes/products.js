const express = require("express");
const multer = require("multer");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middleware/auth");

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Agregamos una prueba para verificar que esta ruta existe
router.get("/", (req, res) => res.json({ message: "Ruta de productos activa" }));

router.get("/", productController.getAllProducts);
router.post("/", verifyToken, upload.single("image"), productController.createProduct);

module.exports = router;
