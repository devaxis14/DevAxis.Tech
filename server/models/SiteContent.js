const mongoose = require("mongoose");

/**
 * SiteContent — Singleton document storing all single-instance editable sections.
 * Uses findOneAndUpdate with upsert to ensure only one document ever exists.
 */
const siteContentSchema = new mongoose.Schema(
  {
    // ── Hero Section ──
    hero: {
      headline: { type: String, default: "Define Your" },
      highlightedText: { type: String, default: "Digital Space" },
      subheading: {
        type: String,
        default:
          "We build immersive digital experiences that elevate your brand and drive real results.",
      },
      ctaText: { type: String, default: "Get a Quote" },
      backgroundImage: { type: String, default: null }, // Cloudinary URL or null for default
    },

    // ── FunFact Section ──
    funFact: {
      title: { type: String, default: "Our fun fact" },
      description: {
        type: String,
        default:
          "Each time we fix a particularly tricky bug, we give it a name and create a virtual 'Bug Wall of Fame'. It's our way of celebrating overcoming challenges and learning from our mistakes.",
      },
      stats: {
        type: [
          {
            number: { type: String, required: true },
            label: { type: String, required: true },
          },
        ],
        default: [
          { number: "250", label: "Projects Completed" },
          { number: "300", label: "Happy Clients" },
          { number: "50", label: "Innovations" },
          { number: "30", label: "Team Members" },
        ],
      },
    },

    // ── About Section ──
    about: {
      eyebrow: { type: String, default: "About Us" },
      headline: { type: String, default: "Born in Kochi, Built for the Web" },
      paragraphs: {
        type: [String],
        default: [
          'DevAxis was founded in 2019 by Arjun Menon and Priya Nair — two designers and developers who believed that businesses in Kerala deserved world-class digital experiences.',
          "What started as a two-person studio overlooking the Kochi backwaters has grown into a team of passionate creatives, engineers, and strategists. We've since helped 50+ businesses — from Marine Drive startups to established brands across Kerala — build websites that don't just look beautiful, but drive real results.",
          "Our philosophy is simple: great design is invisible. When a website works so well that users don't even think about the interface — that's when we know we've done our job.",
        ],
      },
      founders: {
        type: [
          {
            name: { type: String, required: true },
            title: { type: String, required: true },
            initials: { type: String, required: true },
          },
        ],
        default: [
          {
            name: "Arjun Menon",
            title: "Co-Founder & Creative Director",
            initials: "AM",
          },
          {
            name: "Priya Nair",
            title: "Co-Founder & Tech Lead",
            initials: "PN",
          },
        ],
      },
      stats: {
        type: [
          {
            value: { type: String, required: true },
            label: { type: String, required: true },
          },
        ],
        default: [
          { value: "50+", label: "Projects Completed" },
          { value: "40+", label: "Happy Clients" },
          { value: "5+", label: "Years in Business" },
          { value: "4.9★", label: "Google Rating" },
        ],
      },
    },

    // ── Contact Info ──
    contactInfo: {
      phone: { type: String, default: "+91 98765 43210" },
      email: { type: String, default: "hello@devaxis.in" },
      whatsappNumber: { type: String, default: "919876543210" },
      whatsappMessage: {
        type: String,
        default:
          "Hi DevAxis, I'm interested in your web design services.",
      },
      address: {
        line1: { type: String, default: "2nd Floor, Skyline Tower," },
        line2: { type: String, default: "Marine Drive, Kochi," },
        line3: { type: String, default: "Kerala 682031, India" },
      },
      businessHours: {
        weekday: { type: String, default: "Mon–Fri 9am–6pm" },
        saturday: { type: String, default: "Sat 10am–2pm" },
      },
    },

    // ── Footer ──
    footer: {
      tagline: {
        type: String,
        default:
          "Crafting exceptional digital experiences for businesses in Kochi, Kerala and beyond since 2019.",
      },
      socialLinks: {
        facebook: {
          type: String,
          default: "https://www.facebook.com/devaxis",
        },
        instagram: {
          type: String,
          default: "https://www.instagram.com/devaxis",
        },
        linkedin: {
          type: String,
          default: "https://www.linkedin.com/company/devaxis",
        },
        twitter: {
          type: String,
          default: "https://twitter.com/devaxis",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Static method to get or create the singleton document.
 */
siteContentSchema.statics.getContent = async function () {
  let content = await this.findOne();
  if (!content) {
    content = await this.create({});
  }
  return content;
};

/**
 * Static method to update a specific section.
 * Uses findOneAndUpdate with upsert to ensure singleton behavior.
 */
siteContentSchema.statics.updateSection = async function (section, data) {
  const update = {};
  update[section] = data;
  return this.findOneAndUpdate(
    {},
    { $set: update },
    { new: true, upsert: true, runValidators: true }
  );
};

module.exports = mongoose.model("SiteContent", siteContentSchema);
