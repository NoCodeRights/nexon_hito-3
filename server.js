const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const products = require("./routes/products");
const users = require("./routes/users");

dotenv.config();
const app = express();

// Middleware CORS mejorado
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // Permite envío de cookies/autenticación
}));

// Middleware para servir archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json()); // Para recibir JSON en el backend
app.use(morgan("dev")); // Para ver logs en consola

// Rutas
app.use("/api/products", products);
app.use("/api/users", users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
