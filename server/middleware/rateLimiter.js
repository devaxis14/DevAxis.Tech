const rateLimit = require("express-rate-limit");

/**
 * Rate limiter for public-facing endpoints (contact form, testimonial submit).
 * Prevents spam and abuse.
 */
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests — please try again in 15 minutes",
  },
});

/**
 * Stricter rate limiter for auth endpoints (login).
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 login attempts per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts — please try again in 15 minutes",
  },
});

/**
 * General API rate limiter (more generous).
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests — please slow down",
  },
});

module.exports = { publicLimiter, authLimiter, apiLimiter };
