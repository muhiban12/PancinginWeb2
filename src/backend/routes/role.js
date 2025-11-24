// routes/role.js
const express = require("express");
const router = express.Router();
const { tambahRole } = require("../controller/rolecontroller");
const verifyToken = require("../middleware/verifytoken");

router.post("/tambah", verifyToken, tambahRole);

module.exports = router;
