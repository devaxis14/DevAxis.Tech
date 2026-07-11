const Service = require("../models/Service");

/**
 * GET /api/services
 * Get all active services (public) or all services (admin).
 */
exports.getServices = async (req, res, next) => {
  try {
    const filter = req.admin ? {} : { isActive: true };
    const services = await Service.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/services/:id
 * Get a single service by ID (admin).
 */
exports.getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/services
 * Create a new service (admin).
 */
exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/services/:id
 * Update a service (admin).
 */
exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/services/:id
 * Delete a service (admin).
 */
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.status(200).json({ success: true, message: "Service deleted" });
  } catch (error) {
    next(error);
  }
};
