const express = require("express");
const router = express.Router();
const paketController = require("../controller/paketcontroller");

router.post("/tambah", paketController.tambah);
router.get("/spot/:spot_id/list", paketController.listBySpot);
router.get("/available", paketController.available);

module.exports = router;