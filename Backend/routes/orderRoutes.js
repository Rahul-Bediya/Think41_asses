const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Get all orders
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Get order by ID
router.get("/:id", async (req, res) => {
  const order = await Order.findOne({ order_id: req.params.id });
  order ? res.json(order) : res.status(404).json({ error: "Order not found" });
});

// Create order
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();
  res.status(201).json(newOrder);
});

// Update order by ID
router.put("/:id", async (req, res) => {
  const updated = await Order.findOneAndUpdate({ order_id: req.params.id }, req.body, { new: true });
  updated ? res.json(updated) : res.status(404).json({ error: "Order not found" });
});

// Delete order by ID
router.delete("/:id", async (req, res) => {
  const deleted = await Order.findOneAndDelete({ order_id: req.params.id });
  deleted ? res.json({ message: "Order deleted" }) : res.status(404).json({ error: "Order not found" });
});

module.exports = router;
