const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const products = require("./routes/products");
const users = require("./routes/users");
const cart = require("./routes/cart");
const favorites = require("./routes/favorites");

dotenv.config();
const app = express();

// Middleware CORS mejorado
app.use(cors({
  origin: ["http://localhost:5173", "https://nexon-hito-2.vercel.app", "https://nexon-hito-3.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Middleware para servir archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json()); // Para recibir JSON en el backend
app.use(morgan("dev")); // Para ver logs en consola

// Rutas
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/cart", cart);
app.use("/api/favorites", favorites);

// Ruta de prueba para saber si el servidor está activo
app.get("/", (req, res) => {
  res.send("🟢 API funcionando correctamente. Usa /api para acceder a las rutas.");
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Exportamos la app para los tests
module.exports = app;
