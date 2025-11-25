const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingcontroller");

router.post("/buat", bookingController.buat);
router.put("/:id/konfirmasi", bookingController.konfirmasi);
router.put("/:id/batal", bookingController.batal);
router.get("/:id", bookingController.detail);
router.get("/saya", bookingController.listByUser);
router.get("/masuk", bookingController.listMasuk);
router.get("/available", bookingController.available);

module.exports = router;