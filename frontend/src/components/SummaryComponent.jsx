import React, { useState } from "react";
import axios from "axios";

function SummaryComponent({ filename }) {
  const [summary, setSummary] = useState(
    "Awaiting document upload for summary."
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetSummary = async () => {
    if (!filename) {
      setError(
        "No files provided to summarize. Please upload a document first."
      );
      setSummary("Error: No document selected.");
      return;
    }

    setLoading(true);
    setError(null);
    setSummary("Generating summary...");

    try {
      const response = await axios.post(
        "http://localhost:8000/summarize/",
        { filename: filename },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSummary(response.data.summary);
    } catch (err) {
      console.error("Error fetching summary:", err);
      if (err.response && err.response.data && err.response.data.detail) {
        setError(`Error: ${err.response.data.detail}`);
      } else {
        setError(
          "Failed to generate summary. Please ensure a valid PDF was uploaded."
        );
      }
      setSummary("Summary generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Generate Summary
      </h2>

      <p className="text-base text-gray-700 mb-4">
        Document for summary:{" "}
        <span className="font-medium text-blue-700">
          {filename || "No file uploaded yet"}
        </span>
      </p>

      <button
        onClick={handleGetSummary}
        disabled={loading || !filename}
        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-full
                   shadow-md hover:shadow-lg transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Summarizing..." : "Get Summary"}
      </button>

      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg min-h-[100px] flex items-center justify-center">
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
          {summary}
        </p>
      </div>
    </div>
  );
}

export default SummaryComponent;
