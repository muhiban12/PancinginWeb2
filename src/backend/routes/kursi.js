const express = require("express");
const router = express.Router();
const kursiController = require("../controller/kursicontroller");

router.post("/tambah", kursiController.tambah);
router.get("/spot/:spot_id/list", kursiController.listBySpot);
router.get("/available", kursiController.available);

module.exports = router;