const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const db = require("./config/db");

const app = express(); // pindahkan ini ke atas dulu
app.set("db", db);     // baru set db setelah app dibuat

// Middleware dasar
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes modular
const authRoutes = require("./routes/auth");
const produkRoutes = require("./routes/produk");
const spotRoutes = require("./routes/spot");

const tokoRoutes = require("./routes/toko");
app.use("/api/toko", tokoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/produk", produkRoutes);
app.use("/api/spot", spotRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Server berjalan dengan baik");
});

// Error handler global
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ error: "Terjadi kesalahan server" });
});

// Test koneksi DB
db.query("SELECT 1")
  .then(() => console.log("✅ Terhubung ke MySQL"))
  .catch((err) => console.error("❌ Gagal koneksi ke MySQL:", err));

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
