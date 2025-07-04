import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // The product name you want to display
  category: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);