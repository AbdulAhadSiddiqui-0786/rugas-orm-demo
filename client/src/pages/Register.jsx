import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/auth/register", form, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded dark:bg-white">
      <h2 className="text-xl font-bold mb-4">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "password"].map((field) => (
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
          className="w-full bg-blue-600 text-white py-2"
          disabled={loading}
        >
          {loading ? "Creating…" : "Register"}
        </button>
      </form>
    </div>
  );
}
