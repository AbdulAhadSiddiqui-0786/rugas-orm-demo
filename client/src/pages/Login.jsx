import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/services/api";
 

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded dark:text-black dark:bg-white">
      <h2 className="text-xl font-bold mb-4 dark:text-black">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["email", "password"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            placeholder={field}
            className="block w-full border p-2"
            required
          />
        ))}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
