const express = require("express");
const router = express.Router();
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const protect = require("../middleware/auth");

// Public route (gets only active services)
router.get("/", getServices);

// Admin routes
router.get("/:id", protect, getService);
router.post("/", protect, createService);
router.put("/:id", protect, updateService);
router.delete("/:id", protect, deleteService);

module.exports = router;
