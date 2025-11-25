const express = require("express");
const router = express.Router();
const eventController = require("../controller/eventcontroller");

router.post("/tambah", eventController.tambah);
router.get("/spot/:spot_id/list", eventController.listBySpot);
router.get("/:id", eventController.detail);

module.exports = router;