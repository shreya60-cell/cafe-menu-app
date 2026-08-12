const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Test GET route
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error.message);

    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// Create new order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully!",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order error:", error.message);

    res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
});

module.exports = router;
