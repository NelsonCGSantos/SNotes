/**
 * Middleware to restrict access based on user roles.
 * @param {Array} roles - Allowed roles for the route.
 */
module.exports = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};
