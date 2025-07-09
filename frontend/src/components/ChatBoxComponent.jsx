import React, { useState } from "react";
import axios from "axios";

function ChatBoxComponent() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(
    "Ask a question about the uploaded document."
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const askQuery = async () => {
    if (!query.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse("Thinking...");

    try {
      const res = await axios.post(
        "http://localhost:8000/chat",
        { query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(res.data.response);
      setQuery("");
    } catch (err) {
      console.error("Chat error:", err);
      if (err.response && err.response.data && err.response.data.detail) {
        setError(`Error: ${err.response.data.detail}`);
      } else {
        setError("Failed to get response from chat. Please try again.");
      }
      setResponse("Failed to get response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Chat with the Document
      </h2>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-y min-h-[80px]"
        rows={3}
        placeholder="Type your question here..."
        disabled={loading}
      />
      <button
        className="mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-full
                   shadow-md hover:shadow-lg transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={askQuery}
        disabled={loading || !query.trim()}
      >
        {loading ? "Asking..." : "Ask Question"}
      </button>

      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg min-h-[100px] flex items-center justify-center">
        <p className="text-blue-900 whitespace-pre-wrap leading-relaxed">
          {response}
        </p>
      </div>
    </div>
  );
}

export default ChatBoxComponent;
