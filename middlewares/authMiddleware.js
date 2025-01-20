const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

  
    const token = authHeader.split(" ")[1];

   
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = verified;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(400).json({ error: "Invalid token" });
  }
};
