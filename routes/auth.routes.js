const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/userControllers");

// -------------------------------
// Auth Routes
// -------------------------------
router.post("/register", authControllers.register_post);
router.post("/login", authControllers.login_post);
router.get("/refresh", authControllers.refresh_get);
router.delete("/logout", authControllers.logout_delete);

module.exports = router;
