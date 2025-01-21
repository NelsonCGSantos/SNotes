const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    // Debugging log
    console.log("🔍 Decoded Token:", decoded);

    // Fetch the user from the database using Sequelize
    const user = await User.findByPk(decoded.id);

    if (!user) {
      console.log("❌ User not found in DB!");
      return res.status(401).json({ error: "Invalid token. User not found." });
    }

    req.user = user; // Attach user object to request
    next();
  } catch (error) {
    console.error("❌ JWT Verification Error:", error.message);
    return res.status(400).json({ error: "Invalid token" });
  }
};
