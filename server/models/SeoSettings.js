const mongoose = require("mongoose");

/**
 * SeoSettings — Singleton document for SEO meta data.
 */
const seoSettingsSchema = new mongoose.Schema(
  {
    pageTitle: {
      type: String,
      default: "Web Design Company in Kochi, Kerala | DevAxis",
      maxlength: 70,
    },
    metaDescription: {
      type: String,
      default:
        "DevAxis is a leading web design company in Kochi, Kerala. We craft stunning websites, e-commerce stores, and SEO strategies that grow your business.",
      maxlength: 160,
    },
    keywords: {
      type: [String],
      default: [
        "web design Kochi",
        "web development Kerala",
        "web design company Kochi",
        "website design Kochi",
        "ecommerce development Kochi",
        "SEO services Kochi",
        "web agency Kerala",
      ],
    },
    ogImage: {
      type: String,
      default: null, // Cloudinary URL or null for default
    },
    siteUrl: {
      type: String,
      default: "https://devaxis.in",
    },
    companyName: {
      type: String,
      default: "DevAxis",
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
