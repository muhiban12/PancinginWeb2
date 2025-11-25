const express = require("express");
const router = express.Router();
const bookingEventController = require("../controller/bookingeventcontroller");

router.post("/buat", bookingEventController.buat);
router.put("/:id/konfirmasi", bookingEventController.konfirmasi);
router.put("/:id/batal", bookingEventController.batal);
router.get("/saya", bookingEventController.listByUser);
router.get("/masuk", bookingEventController.listMasuk);

module.exports = router;