const express = require("express");
const router = express.Router();
const spotController = require("../controller/spotcontroller");

router.post("/buka", spotController.buka);
router.get("/list", spotController.list);
router.get("/:id", spotController.detail);

module.exports = router;