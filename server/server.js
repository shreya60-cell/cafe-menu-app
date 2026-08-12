const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test backend route
app.get("/", (req, res) => {
  res.json({
    message: "☕ Coffee Corner Backend is running!",
  });
});

// Test order API route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Order API is working!",
  });
});

// Order routes
app.use("/api/orders", orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `☕ Coffee Corner server running on http://localhost:${PORT}`
  );
});