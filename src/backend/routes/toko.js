const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifytoken");
const cekPeran = require("../middleware/cekPeran");
const tokoController = require("../controller/tokocontroller");

router.post("/buat", verifyToken, cekPeran("pengguna"), tokoController.buat);
router.get("/list", tokoController.list);
router.get("/:id", tokoController.detail);
router.get("/:id/produk", tokoController.produkToko);
router.put("/update", verifyToken, cekPeran("pemilik_toko"), tokoController.update);
router.delete("/hapus", verifyToken, cekPeran("pemilik_toko"), tokoController.hapus);

module.exports = router;