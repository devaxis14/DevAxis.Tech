const express = require("express");
const router = express.Router();
const {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  submitTestimonial,
  updateTestimonial,
  updateStatus,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const protect = require("../middleware/auth");
const { publicLimiter } = require("../middleware/rateLimiter");

// Public routes
router.get("/", getTestimonials); // Only returns approved for non-admin
router.post("/submit", publicLimiter, submitTestimonial); // Client submission (rate-limited)

// Admin routes
router.get("/all", protect, getTestimonials);
router.get("/:id", protect, getTestimonial);
router.post("/", protect, createTestimonial);
router.put("/:id", protect, updateTestimonial);
router.patch("/:id/status", protect, updateStatus); // Approve/reject
router.delete("/:id", protect, deleteTestimonial);

module.exports = router;
