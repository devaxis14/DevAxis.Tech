const Joi = require("joi");

/**
 * Validate contact form submission.
 */
exports.validateContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
    }),
    email: Joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email",
    }),
    phone: Joi.string().trim().max(20).allow("").optional(),
    service: Joi.string().trim().max(50).allow("").optional(),
    message: Joi.string().trim().min(10).max(2000).required().messages({
      "string.empty": "Message is required",
      "string.min": "Message must be at least 10 characters",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((d) => d.message),
    });
  }

  next();
};

/**
 * Validate testimonial submission.
 */
exports.validateTestimonial = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    role: Joi.string().trim().min(2).max(150).required(),
    quote: Joi.string().trim().min(20).max(1000).required().messages({
      "string.min": "Review must be at least 20 characters",
    }),
    rating: Joi.number().integer().min(1).max(5).default(5),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((d) => d.message),
    });
  }

  next();
};
