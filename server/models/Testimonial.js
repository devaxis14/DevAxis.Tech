const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    role: {
      type: String,
      required: [true, "Role/Company is required"],
      trim: true,
      maxlength: 150,
    },
    quote: {
      type: String,
      required: [true, "Testimonial quote is required"],
      trim: true,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    initials: {
      type: String,
      trim: true,
      maxlength: 3,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically compute initials from name if not provided
testimonialSchema.pre("save", function (next) {
  if (!this.initials || this.initials === "") {
    this.initials = this.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  }
  next();
});

// Index for filtered queries
testimonialSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Testimonial", testimonialSchema);
