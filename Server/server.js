const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/database");

dotenv.config();

const app = express();

console.log('🚀 Server: Starting Digital Xerox Shop Backend...');
console.log('📍 Server: Environment:', process.env.NODE_ENV || 'development');
console.log('🔧 Server: MongoDB URI configured:', !!process.env.MONGODB_URI);
console.log('☁️ Server: Cloudinary configured:', !!process.env.CLOUDINARY_CLOUD_NAME);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
console.log('🛣️ Server: Setting up API routes...');
app.use("/api/owner", require("./routes/owner"));
app.use("/api/documents", require("./routes/documents"));
app.use("/api/upload", require("./routes/upload"));

// Health check
app.get("/api/health", (req, res) => {
  console.log('❤️ Health check requested');
  res.json({
    message: "Server is running!",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Serve static files from React build in production
if (process.env.NODE_ENV === "production") {
  console.log('📦 Server: Serving static files from React build');
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Handle 404 for API routes
app.use("/api/*", (req, res) => {
  console.log('🚫 API route not found:', req.path);
  res.status(404).json({ message: "API route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || "development"}`);
  if (process.env.NODE_ENV !== "production") {
    console.log(`🌐 Client: http://localhost:3000`);
    console.log(`🔧 API: http://localhost:${PORT}/api`);
  }
  console.log('✅ Digital Xerox Shop Backend ready!');
});