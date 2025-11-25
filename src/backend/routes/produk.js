// assets/backend/routes/produk.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifytoken");
const cekPeran = require("../middleware/cekPeran");
const produkController = require("../controller/produkcontroller");

router.post("/tambah", verifyToken, cekPeran("pemilik_toko"), produkController.tambah);
router.put("/:id", verifyToken, cekPeran("pemilik_toko"), produkController.update);
router.delete("/:id", verifyToken, cekPeran("pemilik_toko"), produkController.hapus);

// endpoint publik (tanpa role khusus)
router.get("/", produkController.list);
router.get("/toko/:toko_id", produkController.listByToko);
router.get("/:id", produkController.detail);

module.exports = router;