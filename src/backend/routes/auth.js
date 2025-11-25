const express = require("express");
const router = express.Router();
const authController = require("../controller/authcontroller");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.get("/me", verifyToken, authController.me);

// contoh endpoint role-protected
router.get("/admin-only", verifyToken, requireRole("admin"), (req, res) => {
  res.json({ message: "Halo Admin!", user: req.user });
});

module.exports = router;
