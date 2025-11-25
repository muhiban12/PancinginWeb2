const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader)
    return res.status(401).json({ error: "Authorization header tidak ditemukan" });

  // Harus format: "Bearer tokenxxx"
  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(400).json({ error: "Format token harus: Bearer <token>" });

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT Error:", err.name);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token sudah kedaluwarsa" });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token tidak valid" });
    }

    return res.status(500).json({ error: "Gagal memproses token" });
  }
};
