const express = require("express");
const router = express.Router();
const {
  getPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");
const protect = require("../middleware/auth");

// Public route
router.get("/", getPortfolios);

// Admin routes
router.get("/:id", protect, getPortfolio);
router.post("/", protect, createPortfolio);
router.put("/:id", protect, updatePortfolio);
router.delete("/:id", protect, deletePortfolio);

module.exports = router;
