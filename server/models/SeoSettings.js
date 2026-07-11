const mongoose = require("mongoose");

/**
 * SeoSettings — Singleton document for SEO meta data.
 */
const seoSettingsSchema = new mongoose.Schema(
  {
    titleTemplate: {
      type: String,
      default: "%s | DevAxis",
    },
    defaultTitle: {
      type: String,
      default: "DevAxis Technology",
    },
    defaultDescription: {
      type: String,
      default: "DevAxis is a leading web design company in Kochi, Kerala.",
    },
    defaultKeywords: {
      type: String,
      default: "web design Kochi, web development Kerala",
    },
    siteName: {
      type: String,
      default: "DevAxis Technology",
    },
    canonicalUrl: {
      type: String,
      default: "",
    },
    googleSiteVerification: {
      type: String,
      default: "",
    },
    ogImage: {
      type: String,
      default: "/images/devaxis-logo.png",
    },
  },
  {
    timestamps: true,
  }
);

seoSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model("SeoSettings", seoSettingsSchema);
