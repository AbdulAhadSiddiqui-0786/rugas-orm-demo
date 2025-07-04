// src/components/Spinner.jsx
import React from "react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-full min-h-[200px]">
      <div
        className="
          inline-block
          h-8
          w-8
          // --- CHANGE THIS LINE ---
          animate-[spin_10s_linear_infinite] // Changed from 1s to 1.5s for a slightly slower spin
          // You can increase '1.5s' to '2s', '3s', etc., to make it even slower
          rounded-full
          border-4
          border-solid
          border-current
          border-r-transparent
          align-[-0.125em]
          text-blue-500
          motion-reduce:animate-[spin_1.5s_linear_infinite] /* Keep this consistent or remove if not needed */
        "
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
