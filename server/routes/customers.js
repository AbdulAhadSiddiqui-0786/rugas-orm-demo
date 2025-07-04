import express from "express";
import Customer from "../models/Customer.js";
import Order from "../models/Order.js"; 
import Product from "../models/Product.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer); 
  } catch (err) {
    console.error("Error creating customer:", err); 
 
    if (err.code === 11000) { 
      return res.status(409).json({ error: "Customer with provided email already exists." });
    }
    res.status(500).json({ error: err.message }); 
  }
});


router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().populate({
      path: 'orders', 
      populate: {
        path: 'productId', 
        model: 'Product'   
      }
    });
    res.json(customers);
  } catch (err) {
    console.error("Error fetching customers and populating orders/products:", err); 
    res.status(500).json({ error: err.message });
  }
});

router.get("/check", async (req, res) => {
  const { name, email, phone, address } = req.query;

  try {
    const existingCustomer = await Customer.findOne({
      $or: [
        { name: new RegExp(`^${name}$`, 'i') }, 
        { email: new RegExp(`^${email}$`, 'i') }, 
        { phone: phone }, 
        { address: new RegExp(`^${address}$`, 'i') } 
      ]
    });

    if (existingCustomer) {
      return res.json({ exists: true, customer: existingCustomer });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking for existing customer (exact match):", err);
    res.status(500).json({ error: "Server error during customer check." });
  }
});


router.get("/search", async (req, res) => {
  const { query } = req.query; 

  if (!query) {
 
    return res.status(400).json({ error: "Search query is required." });
  }


  const searchRegExp = new RegExp(query, 'i');

  try {
    const matchingCustomers = await Customer.find({
      $or: [
        { name: searchRegExp },
        { email: searchRegExp },
        { phone: searchRegExp }, 
        { address: searchRegExp }
      ]
    }).populate({ 
      path: 'orders',
      populate: {
        path: 'productId',
        model: 'Product'
      }
    });

    res.json(matchingCustomers); // Return an array of all matching customers
  } catch (err) {
    console.error("Error during customer search (partial match):", err);
    res.status(500).json({ error: "Server error during customer search." });
  }
});

export default router;