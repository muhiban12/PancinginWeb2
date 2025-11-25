const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifytoken");
const ulasanController = require("../controller/ulasancontroller");

// Tambah ulasan (user login)
router.post("/tambah", verifyToken, ulasanController.tambah);

// List ulasan per target
router.get("/:target_type/:target_id/list", ulasanController.listByTarget);

// Summary rating per target
router.get("/:target_type/:target_id/summary", ulasanController.summary);

module.exports = router;