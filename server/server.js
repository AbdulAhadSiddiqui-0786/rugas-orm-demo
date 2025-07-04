import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import customerRoutes from "./routes/customers.js";
import productRoutes  from "./routes/products.js";
import orderRoutes    from "./routes/orders.js";
import authRoutes     from "./routes/auth.js";

dotenv.config();                 

const app = express();


app.use(cors({                  
  origin: process.env.CLIENT_ORIGIN || "*",
  credentials: true
}));
app.use(express.json());


app.use("/api/auth",     authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products",  productRoutes);
app.use("/api/orders",    orderRoutes);


const PORT = process.env.PORT || 10000; 
const MONGO_URI = process.env.MONGO_URI;  

if (!MONGO_URI) {
  console.error("❌  MONGO_URI missing. Add it to .env or Render variables.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅  MongoDB connected");
    app.listen(PORT, () =>
      console.log(`✅  Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌  MongoDB connection error:", err);
    process.exit(1);
  });
