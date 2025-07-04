import React from "react";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 ease-in-out">
      <Navbar />
      <main className="p-4 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
