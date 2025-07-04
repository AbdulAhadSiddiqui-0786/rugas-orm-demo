import { useEffect, useState } from "react";
import OrderItem from "../components/OrderItem";
import FormInput from "../components/FormInput";
import API from "@/services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ customerId: "", productId: "" });
  const [statusFilter, setStatusFilter] = useState("");

  const fetchData = async () => {
    const [custRes, prodRes, orderRes] = await Promise.all([
      API.get("/customers"),
      API.get("/products"),
      API.get("/orders"),
    ]);
    setCustomers(custRes.data);
    setProducts(prodRes.data);
    setOrders(orderRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    await API.post("/orders", form);
    setForm({ customerId: "", productId: "" });
    fetchData();
  };

  const handleStatusUpdate = async (id, status) => {
    await API.patch(`/orders/${id}`, { status });
    fetchData();
  };

  const filteredOrders = orders.filter((o) =>
    statusFilter ? o.status === statusFilter : true
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">📦 Manage Orders</h2>

      <form onSubmit={handleCreateOrder} className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium dark:text-white">Select Customer</label>
          <select
            value={form.customerId}
            onChange={(e) => setForm({ ...form, customerId: e.target.value })}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
          >
            <option value="">-- Choose --</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium dark:text-white">Select Product</label>
          <select
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
          >
            <option value="">-- Choose --</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Create Order
          </button>
        </div>
      </form>

      <div className="flex gap-2 flex-wrap items-center">
        <label className="text-sm font-medium dark:text-white">Filter by Status:</label>
        {["", "Placed", "Shipped", "Delivered", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded text-sm border ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            }`}
          >
            {status || "All"}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <OrderItem
            key={order._id}
            order={order}
            onStatusChange={handleStatusUpdate}
          />
        ))}
      </div>
    </div>
  );
}
