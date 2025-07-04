import React from "react";

export default function OrderItem({ order, onStatusChange }) {
  const { customerId, productId, status } = order;

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm space-y-2">
      <div>
        <p className="font-medium">
          <span className="text-blue-600 dark:text-blue-400">
            {customerId?.name}
          </span>{" "}
          ordered <span className="font-semibold">{productId?.name}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Status: <strong>{status}</strong>
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["Shipped", "Delivered", "Cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => onStatusChange(order._id, s)}
            className={`px-3 py-1 rounded text-sm font-medium 
              ${s === "Shipped" && "bg-yellow-500 text-white"}
              ${s === "Delivered" && "bg-green-500 text-white"}
              ${s === "Cancelled" && "bg-red-500 text-white"}
              hover:opacity-90 transition`}
          >
            Mark {s}
          </button>
        ))}
      </div>
    </div>
  );
}
