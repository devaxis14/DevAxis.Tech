const Testimonial = require("../models/Testimonial");

/**
 * GET /api/testimonials
 * Admin: Get all testimonials with optional status filter.
 * Public: Get only approved testimonials.
 */
exports.getTestimonials = async (req, res, next) => {
  try {
    let filter;

    if (req.admin) {
      // Admin can filter by status via query param
      filter = req.query.status ? { status: req.query.status } : {};
    } else {
      // Public can only see approved
      filter = { status: "approved" };
    }

    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/testimonials/:id
 * Get a single testimonial by ID (admin).
 */
exports.getTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/testimonials
 * Admin: Create a testimonial directly (auto-approved).
 */
exports.createTestimonial = async (req, res, next) => {
  try {
    const data = { ...req.body, status: "approved", reviewedAt: new Date() };
    const testimonial = await Testimonial.create(data);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/testimonials/submit
 * Public: Client submits a testimonial (status = pending).
 * Rate-limited to prevent spam.
 */
exports.submitTestimonial = async (req, res, next) => {
  try {
    const { name, role, quote, rating } = req.body;

    if (!name || !role || !quote) {
      return res.status(400).json({
        success: false,
        message: "Name, role, and quote are required",
      });
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      quote,
      rating: rating || 5,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Thank you! Your testimonial has been submitted for review.",
      data: { id: testimonial._id },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/testimonials/:id
 * Update a testimonial (admin).
 */
exports.updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/testimonials/:id/status
 * Approve or reject a testimonial (admin).
 */
exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'approved' or 'rejected'",
      });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status, reviewedAt: new Date() },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    res.status(200).json({
      success: true,
      message: `Testimonial ${status}`,
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/testimonials/:id
 * Delete a testimonial (admin).
 */
exports.deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }
    res.status(200).json({ success: true, message: "Testimonial deleted" });
  } catch (error) {
    next(error);
  }
};
