const express = require("express");
const router = express.Router();

const bookingController = require("../controller/bookingController");

// Semua fungsi booking
router.post("/tambah", bookingController.tambah);
router.get("/available", bookingController.available);
router.get("/:id", bookingController.detail);
router.put("/:id/konfirmasi", bookingController.konfirmasi);
router.put("/:id/batal", bookingController.batal);
router.get("/saya/list", bookingController.listByUser);
router.get("/masuk/list", bookingController.listMasuk);

module.exports = router;