const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  reduceStock,
  increaseStock
} = require("../controllers/productController");
const verifyToken = require("../middleware/auth");

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Rutas de productos
router.get("/", getAllProducts);
router.post("/", verifyToken, upload.single("image"), createProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.put("/:id/reduce-stock", verifyToken, reduceStock);
router.put("/:id/increase-stock", verifyToken, increaseStock);

module.exports = router;
