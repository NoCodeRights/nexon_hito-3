const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Acceso denegado. No se proporcionó token." });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token recibido:", token); // Debugging

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", verified); // Debugging
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Token no válido." });
  }
};

module.exports = verifyToken;
