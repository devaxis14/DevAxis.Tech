const mongoose = require("mongoose");

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "",
    },
    service: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: 2000,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for admin dashboard queries
contactSubmissionSchema.index({ isRead: 1, createdAt: -1 });

module.exports = mongoose.model("ContactSubmission", contactSubmissionSchema);
