import React from "react";
import { Link } from "react-router-dom";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4">
      <div className="max-w-md w-full space-y-6 p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
        <h2 className="text-2xl font-bold text-center">
          🔐 Welcome to Rugas ORM
        </h2>
        {children}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
