const SiteContent = require("../models/SiteContent");

/**
 * GET /api/content
 * Get all site content (public — used by frontend to render pages).
 */
exports.getAllContent = async (req, res, next) => {
  try {
    const content = await SiteContent.getContent();
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/content/:section
 * Get a specific section of site content.
 * Valid sections: hero, funFact, about, contactInfo, footer
 */
exports.getSection = async (req, res, next) => {
  try {
    const { section } = req.params;
    const validSections = ["hero", "funFact", "about", "contactInfo", "footer"];

    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: `Invalid section. Must be one of: ${validSections.join(", ")}`,
      });
    }

    const content = await SiteContent.getContent();
    res.status(200).json({ success: true, data: content[section] });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/content/:section
 * Update a specific section (admin only).
 */
exports.updateSection = async (req, res, next) => {
  try {
    const { section } = req.params;
    const validSections = ["hero", "funFact", "about", "contactInfo", "footer"];

    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: `Invalid section. Must be one of: ${validSections.join(", ")}`,
      });
    }

    const content = await SiteContent.updateSection(section, req.body);
    res.status(200).json({
      success: true,
      message: `${section} updated successfully`,
      data: content[section],
    });
  } catch (error) {
    next(error);
  }
};
