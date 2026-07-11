const Portfolio = require("../models/Portfolio");

/**
 * GET /api/portfolio
 * Get all active portfolio projects (public) or all (admin).
 */
exports.getPortfolios = async (req, res, next) => {
  try {
    const filter = req.admin ? {} : { isActive: true };
    const projects = await Portfolio.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/portfolio/:id
 * Get a single portfolio project by ID (admin).
 */
exports.getPortfolio = async (req, res, next) => {
  try {
    const project = await Portfolio.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/portfolio
 * Create a new portfolio project (admin).
 */
exports.createPortfolio = async (req, res, next) => {
  try {
    const project = await Portfolio.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/portfolio/:id
 * Update a portfolio project (admin).
 */
exports.updatePortfolio = async (req, res, next) => {
  try {
    const project = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/portfolio/:id
 * Delete a portfolio project (admin).
 */
exports.deletePortfolio = async (req, res, next) => {
  try {
    const project = await Portfolio.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (error) {
    next(error);
  }
};
