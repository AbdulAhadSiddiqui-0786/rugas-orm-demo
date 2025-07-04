import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm p-4 space-y-2">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md"
        />
      )}
      <div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {product.category}
        </p>
        <p className="text-sm mt-1">{product.description}</p>
        <p className="mt-2 font-bold text-blue-600 dark:text-blue-400">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
}
