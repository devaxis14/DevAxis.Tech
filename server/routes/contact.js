const express = require("express");
const router = express.Router();
const {
  submitContact,
  getSubmissions,
  toggleRead,
  deleteSubmission,
} = require("../controllers/contactController");
const protect = require("../middleware/auth");
const { publicLimiter } = require("../middleware/rateLimiter");

// Public route (rate-limited)
router.post("/", publicLimiter, submitContact);

// Admin routes
router.get("/", protect, getSubmissions);
router.patch("/:id/read", protect, toggleRead);
router.delete("/:id", protect, deleteSubmission);

module.exports = router;
