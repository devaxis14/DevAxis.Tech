const express = require("express");
const router = express.Router();
const { getSettings, updateSettings } = require("../controllers/seoController");
const protect = require("../middleware/auth");

// Public route
router.get("/", getSettings);

// Admin route
router.put("/", protect, updateSettings);

module.exports = router;
