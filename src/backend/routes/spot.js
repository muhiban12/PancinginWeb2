// routes/spot.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Spot route aktif 🚀" });
});

module.exports = router;
