import React, { useState, useEffect } from "react";
import axios from "axios";

function HistoryComponent() {
  const [historyContent, setHistoryContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("http://localhost:8000/history");

        console.log(res.data.result);
        if (Array.isArray(res.data.result)) {
          setHistoryContent(res.data.result);
        } else {
          setHistoryContent([]); // Set to empty array to avoid rendering issues
          setError("Unexpected data format received from API.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching history:", err);

        if (axios.isAxiosError(err) && err.response && err.response.data) {
          setError(
            `Error: ${
              err.response.data.detail ||
              err.response.data.message ||
              "Failed to load data from API."
            }`
          );
        } else {
          setError(
            "Error: Network issue or API is unreachable. Please try again."
          );
        }
        setHistoryContent("Failed to load history.");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg min-h-[100px] flex flex-col items-center justify-center">
      {loading ? (
        <p className="text-gray-800">Loading history...</p>
      ) : error ? (
        <p className="text-red-600 font-medium">{error}</p>
      ) : historyContent.length > 0 ? (
        <div className="w-full">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Chat History:
          </h3>
          {historyContent.map((item, index) => (
            <div
              key={index}
              className="mb-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <p className="text-gray-900 font-medium">
                User: <span className="font-normal">{item.user}</span>
              </p>
              <p className="text-gray-700">
                Bot: <span className="font-normal">{item.bot}</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-800">No history found.</p>
      )}
    </div>
  );
}

export default HistoryComponent;
