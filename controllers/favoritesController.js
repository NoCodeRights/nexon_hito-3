const pool = require("../config/db");

// Agregar un producto a favoritos
exports.addToFavorites = async (req, res) => {
  const { product_id } = req.body;
  const user_id = req.user.id;
  try {
    const newFavorite = await pool.query(
      "INSERT INTO favorites (user_id, product_id) VALUES ($1, $2) RETURNING *",
      [user_id, product_id]
    );
    res.status(201).json(newFavorite.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener los favoritos de un usuario
exports.getFavorites = async (req, res) => {
  const user_id = req.user.id;
  try {
    const favorites = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1",
      [user_id]
    );
    res.json(favorites.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};