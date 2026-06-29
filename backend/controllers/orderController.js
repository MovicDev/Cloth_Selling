const Order = require('../models/Order');

async function getOrders(_req, res) {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}

async function createOrder(req, res) {
  try {
    const order = req.body;

    if (!order?.customerName || !order?.phoneNumber || !order?.productId) {
      return res.status(400).json({ error: 'Order customer and product details are required.' });
    }

    const newOrder = new Order({
      ...order,
      id: order.id || `ord-${Date.now()}`,
      createdAt: order.createdAt || new Date(),
      status: order.status || 'pending',
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
}

async function updateOrder(req, res) {
  try {
    const order = await Order.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body, id: req.params.id },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
}

module.exports = { getOrders, createOrder, updateOrder };