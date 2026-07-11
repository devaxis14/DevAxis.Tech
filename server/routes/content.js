const express = require("express");
const router = express.Router();
const {
  getAllContent,
  getSection,
  updateSection,
} = require("../controllers/contentController");
const protect = require("../middleware/auth");

// Public routes
router.get("/", getAllContent);
router.get("/:section", getSection);

// Admin routes
router.put("/:section", protect, updateSection);

module.exports = router;
