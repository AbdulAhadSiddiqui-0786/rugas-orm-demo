// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link
          to="/"
          className=" flex gap-2 items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          <img src="/favicon.png" alt="logo" className="h-10 w-10" /> RugasORM
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn && (
            <>
              <NavLink to="/" label="Dashboard" active={isActive("/")} />
              <NavLink
                to="/customers"
                label="Customers"
                active={isActive("/customers")}
              />
              <NavLink
                to="/products"
                label="Products"
                active={isActive("/products")}
              />
              <NavLink
                to="/orders"
                label="Orders"
                active={isActive("/orders")}
              />
            </>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
            title="Toggle Theme"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2 bg-white dark:bg-gray-900">
          {isLoggedIn && (
            <>
              <NavLink to="/" label="Dashboard" active={isActive("/")} mobile />
              <NavLink
                to="/customers"
                label="Customers"
                active={isActive("/customers")}
                mobile
              />
              <NavLink
                to="/products"
                label="Products"
                active={isActive("/products")}
                mobile
              />
              <NavLink
                to="/orders"
                label="Orders"
                active={isActive("/orders")}
                mobile
              />
            </>
          )}
          <button
            onClick={toggleTheme}
            className="block w-full text-left text-gray-600 dark:text-gray-300"
          >
            {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

function NavLink({ to, label, active, mobile = false }) {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded text-sm ${
        active
          ? "bg-blue-500 text-white"
          : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
      } ${mobile ? "w-full" : ""}`}
    >
      {label}
    </Link>
  );
}
