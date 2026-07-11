const express = require("express");
const router = express.Router();
const {
  uploadMiddleware,
  uploadImage,
  deleteImage,
} = require("../controllers/uploadController");
const protect = require("../middleware/auth");

// Admin only
router.post("/", protect, uploadMiddleware, uploadImage);
router.delete("/:publicId", protect, deleteImage);

module.exports = router;
