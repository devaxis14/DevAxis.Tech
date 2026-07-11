const SeoSettings = require("../models/SeoSettings");

/**
 * GET /api/seo
 * Get SEO settings (public — used by frontend for meta tags).
 */
exports.getSettings = async (req, res, next) => {
  try {
    const settings = await SeoSettings.getSettings();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/seo
 * Update SEO settings (admin only).
 */
exports.updateSettings = async (req, res, next) => {
  try {
    const settings = await SeoSettings.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: "SEO settings updated",
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};
