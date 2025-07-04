import { useEffect, useState } from "react";
import API from "@/services/api";
export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get("/orders/stats").then((res) => setStats(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">📊 Order Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md border dark:border-gray-700 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-300 capitalize">
              {key}
            </p>
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
