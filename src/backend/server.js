const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3307
});
app.set("db", db);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

db.query("SELECT 1")
  .then(() => console.log("✅ Terhubung ke MySQL"))
  .catch((err) => console.error("❌ Gagal koneksi ke MySQL:", err));

app.get("/", (req, res) => {
  res.send("Server berjalan 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));