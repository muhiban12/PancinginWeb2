const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const db = require("./config/db");

const app = express(); // harus di atas sebelum set db
app.set("db", db);

// Middleware dasar
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Middleware auth (sementara)
const verifyToken = (req, res, next) => {
  req.user = { id: 1 }; // ganti dengan user login asli nanti
  next();
};
app.use(verifyToken);

// Routes modular
const authRoutes = require("./routes/auth");
const produkRoutes = require("./routes/produk");
const spotRoutes = require("./routes/spot");
const tokoRoutes = require("./routes/toko");
const kursiRoutes = require("./routes/kursi");
const paketRoutes = require("./routes/paket");
const bookingRoutes = require("./routes/booking");
const ulasanRoutes = require("./routes/ulasan");
const eventRoutes = require("./routes/event");
const bookingEventRoutes = require("./routes/bookingevent");

// Register semua routes
app.use("/api/auth", authRoutes);
app.use("/api/produk", produkRoutes);
app.use("/api/spot", spotRoutes);
app.use("/api/toko", tokoRoutes);
app.use("/api/kursi", kursiRoutes);
app.use("/api/paket", paketRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/ulasan", ulasanRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/bookingevent", bookingEventRoutes);

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