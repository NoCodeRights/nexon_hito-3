const pool = require("../config/db");

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await pool.query("SELECT * FROM products");
    res.status(200).json(allProducts.rows);
  } catch (err) {
    console.error("Error en getAllProducts:", err);
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  console.log("Usuario autenticado:", req.user);
  const { title, description, price, condition, stock } = req.body;
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newProduct = await pool.query(
      "INSERT INTO products (title, description, price, condition, user_id, image_url, stock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, description, price, condition, user_id, image_url, stock]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    console.error("Error en createProduct:", err);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    console.error("Error eliminando producto:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Reducir stock de un producto
exports.reduceStock = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE products SET stock = GREATEST(stock - 1, 0) WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error reduciendo stock:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Aumentar stock de un producto
exports.increaseStock = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE products SET stock = stock + 1 WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error aumentando stock:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
