import express from "express";
import Order from "../models/Order.js";
import Customer from "../models/Customer.js"; 
import Product from "../models/Product.js"; 

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);

    const customer = await Customer.findById(order.customerId);
    if (customer) {
      customer.orders.push(order._id);
      await customer.save(); // Save the updated customer document
    } else {
      console.warn(`Customer with ID ${order.customerId} not found for new order ${order._id}`);
    }

    res.status(201).json(order); 
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const { status, customer } = req.query; 
    let filter = {};
    if (status) filter.status = status;
    if (customer) filter.customerId = customer;

   
    const orders = await Order.find(filter)
      .populate("customerId")
      .populate("productId"); 
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: err.message });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.json(order);
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/stats", async (req, res) => {
  try {
    const statuses = ["Placed", "Shipped", "Delivered", "Cancelled"];
    const stats = {};
    for (const status of statuses) {
      stats[status] = await Order.countDocuments({ status });
    }
    res.json(stats);
  } catch (err) {
    console.error("Error fetching order stats:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;