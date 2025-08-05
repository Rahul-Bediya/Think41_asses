const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get user by ID
router.get("/:id", async (req, res) => {
  const user = await User.findOne({ id: req.params.id });
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
});

// Create user
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

// Update user by ID
router.put("/:id", async (req, res) => {
  const updated = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  updated ? res.json(updated) : res.status(404).json({ error: "User not found" });
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  const deleted = await User.findOneAndDelete({ id: req.params.id });
  deleted ? res.json({ message: "User deleted" }) : res.status(404).json({ error: "User not found" });
});

module.exports = router;
