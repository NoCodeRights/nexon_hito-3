const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Datos recibidos para registro:", { name, email, password }); // Debugging
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Contraseña hasheada:", hashedPassword); // Debugging
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );
    console.log("Nuevo usuario creado:", newUser.rows[0]); // Debugging
    res.json({ user: newUser.rows[0] });
  } catch (err) {
    console.error("Error en el registro:", err); // Debugging
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Datos recibidos para login:", { email, password }); // Debugging
  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }
    const user = userResult.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error("Error en el login:", err); // Debugging
    res.status(500).json({ error: err.message });
  }
};

//afterAll(async () => {
//  // Cerrar el pool de conexiones para que Jest pueda finalizar correctamente
//  await pool.end();
//});