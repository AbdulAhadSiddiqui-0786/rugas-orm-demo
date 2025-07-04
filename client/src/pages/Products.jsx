import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import ProductCard from "../components/ProductCard";
import API from "@/services/api";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: "",
    
  });
  

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/products", form);
    setForm({
      name: "",
      category: "",
      description: "",
      price: "",
      image: "",
    });
    fetchProducts();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🛍️ Add Product</h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4 dark:text-white bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow"
      >
        <FormInput
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <FormInput
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
        <FormInput
          label="Price (₹)"
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
        />
        <FormInput
          label="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
        />
        <div className="md:col-span-2">
          <FormInput
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
