const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

// 1. Inisialisasi app dulu
const app = express();
app.use(cors());
app.use(express.json());

// 2. Koneksi database
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3307
});
app.set("db", db);

// 3. Import routes setelah app ada
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const roleRoutes = require("./routes/role");
app.use("/api/role", roleRoutes);

// 4. Tes koneksi DB
db.query("SELECT 1")
  .then(() => console.log("✅ Terhubung ke MySQL"))
  .catch((err) => console.error("❌ Gagal koneksi ke MySQL:", err));

// 5. Endpoint default
app.get("/", (req, res) => {
  res.send("Server berjalan 🚀");
});

// 6. Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
