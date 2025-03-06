const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

// Importar las rutas
const products = require("./routes/products");
const users = require("./routes/users");
const cart = require("./routes/cart");
const favorites = require("./routes/favorites");

dotenv.config();
const app = express();

// Middleware CORS corregido
app.use(cors({
  origin: "*", // Permite todas las conexiones (para pruebas)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware para servir archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json()); // Para recibir JSON en el backend
app.use(morgan("dev")); // Para ver logs en consola

// Verificar que las rutas están cargadas correctamente
console.log("Cargando rutas...");
console.log("Usuarios:", users.stack.map(r => r.route.path));
console.log("Productos:", products.stack.map(r => r.route.path));
console.log("Carrito:", cart.stack.map(r => r.route.path));
console.log("Favoritos:", favorites.stack.map(r => r.route.path));

// Rutas con prefijo "/api"
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/cart", cart);
app.use("/api/favorites", favorites);

// Middleware de error (para ver qué está fallando)
app.use((err, req, res, next) => {
  console.error("Error en el servidor:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Iniciar el servidor en el puerto correcto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
