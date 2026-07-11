const jwt = require("jsonwebtoken");
const AdminUser = require("../models/AdminUser");

/**
 * JWT authentication middleware.
 * Checks for token in Authorization header (Bearer) or cookies.
 * Attaches the admin user to req.admin on success.
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header first
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Fallback to cookie
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized — no token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user and attach to request (exclude password)
    const admin = await AdminUser.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Not authorized — admin user not found",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Not authorized — invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Not authorized — token expired",
      });
    }
    next(error);
  }
};

module.exports = protect;
