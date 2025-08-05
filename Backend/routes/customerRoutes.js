const express = require('express');
const router = express.Router();
const Customer = require('../models/User'); // Assuming users data is in "User" model
const Order = require('../models/Order');   // Assuming orders are stored here

// GET /api/customers - list customers (with optional pagination)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const customers = await Customer.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// GET /api/customers/:id - customer details with order count
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const orderCount = await Order.countDocuments({ user_id: customer._id });

    res.json({
      ...customer.toObject(),
      orderCount
    });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving customer', error: err.message });
  }
});

module.exports = router;
