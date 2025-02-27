const pool = require("../config/db");

// Agregar un producto al carrito
exports.addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;
  try {
    const newCartItem = await pool.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [user_id, product_id, quantity]
    );
    res.status(201).json(newCartItem.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener el carrito de un usuario
exports.getCart = async (req, res) => {
  const user_id = req.user.id;
  try {
    const cartItems = await pool.query(
      "SELECT * FROM cart WHERE user_id = $1",
      [user_id]
    );
    res.json(cartItems.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};