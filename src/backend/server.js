const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const db = require("./config/db");
const verifyToken = require("./middleware/verifyToken"); // JWT middleware

const app = express();
app.set("db", db);

// Middleware dasar
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ==============================
// ROUTES IMPORT
// ==============================
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

// ==============================
// ROUTES REGISTRATION
// ==============================

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/produk", produkRoutes);
app.use("/api/spot", spotRoutes);
app.use("/api/event", eventRoutes);

// Protected routes
app.use("/api/toko", verifyToken, tokoRoutes);
app.use("/api/kursi", verifyToken, kursiRoutes);
app.use("/api/paket", verifyToken, paketRoutes);
app.use("/api/booking", verifyToken, bookingRoutes);
app.use("/api/ulasan", verifyToken, ulasanRoutes);
app.use("/api/bookingevent", verifyToken, bookingEventRoutes);

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

// Run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));