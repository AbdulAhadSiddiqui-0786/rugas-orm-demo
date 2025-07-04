import React, { useState } from "react"; // Import useState hook

export default function CustomerListItem({ customer }) {
  // State to manage the visibility of the order history
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  // Function to toggle the history expansion
  const toggleHistory = () => {
    setIsHistoryExpanded(!isHistoryExpanded);
  };

  return (
    // REMOVED 'mx-auto' from here
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm space-y-1 w-full">
      <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
        {customer.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        📍 {customer.address}
      </p>
      <p className="text-sm">📞 {customer.phone}</p>
      <p className="text-sm">✉️ {customer.email}</p>

      {/* --- Order History Section --- */}
      {/* Only show the dropdown toggle if there are orders */}
      {customer.orders && customer.orders.length > 0 ? (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={toggleHistory}
          >
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-200">
              Order History
            </h4>
            {/* Dropdown Icon - changes based on state */}
            <span className="text-xl text-gray-600 dark:text-gray-300">
              {isHistoryExpanded ? "▲" : "▼"} {/* Up/Down arrow */}
            </span>
          </div>

          {/* Conditionally render the order list based on isHistoryExpanded */}
          {isHistoryExpanded && (
            <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 mt-2">
              {customer.orders.map((order) => (
                <li key={order._id || Math.random()} className="mb-1">
                  Order ID: {order._id?.substring(0, 8)} - Product:{" "}
                  {order.productId?.name ||
                    order.productId?._id?.substring(0, 8) ||
                    "N/A"}{" "}
                  - Status: {order.status} - Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        // Display "No orders yet." if customer.orders is empty or null
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          No orders yet.
        </div>
      )}
    </div>
  );
}
