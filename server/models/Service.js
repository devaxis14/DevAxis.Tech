const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    image: {
      type: String,
      default: null, // Cloudinary URL — null means use default
    },
    icon: {
      type: String,
      default: "Monitor",
    },
    features: {
      type: [String],
      default: [],
    },
    alt: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
    href: {
      type: String,
      default: "#contact",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for sorted retrieval
serviceSchema.index({ order: 1, createdAt: 1 });

module.exports = mongoose.model("Service", serviceSchema);
