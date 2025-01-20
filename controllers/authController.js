const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");


const signup = async (req, res) => {
  try {
    console.log("🔹 Signup request received:", req.body);

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("❌ Signup Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    console.log("🔹 Login request received:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("✅ User authenticated:", user.email);

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Generated Token:", token);
    res.json({ token });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  signup,
  login,
};
