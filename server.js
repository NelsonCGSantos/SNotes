require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

/**
 * 🔒 Security & Middleware
 * - Helmet: Secures HTTP headers
 * - Morgan: Logs HTTP requests for debugging
 * - Express JSON: Enables JSON body parsing
 * - CORS: Restricts access to trusted origins
 * - Rate Limiting: Prevents abuse and protects API
 */

// Secure HTTP headers
app.use(helmet());

// Logging middleware for debugging
app.use(morgan("dev"));

// Body parser middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5001"];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow requests from whitelisted origins
    } else {
      callback(new Error("CORS policy does not allow this origin"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));


// Rate limiting to prevent excessive API calls
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Root route (Health Check)
app.get("/", (req, res) => res.send("Welcome to the Secure Notes API!"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Start the server unless running tests
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🌱 Server running on port ${PORT}`));
}

// Export app for testing
module.exports = app;
