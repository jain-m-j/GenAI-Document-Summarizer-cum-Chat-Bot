import React, { useState, useEffect } from "react";
import axios from "axios";

function DocumentUploaderComponent({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus(`Upload successful! ${res.data.result}`);

      if (onUploadSuccess && res.data.filename) {
        onUploadSuccess(res.data.filename);
      } else {
        onUploadSuccess(file.name);
      }
    } catch (error) {
      console.error("Upload error:", error);
      if (error.response && error.response.data && error.response.data.detail) {
        setUploadStatus(`Upload failed: ${error.response.data.detail}`);
      } else {
        setUploadStatus("Upload failed. Please try again.");
      }
    } finally {
      setLoading(false);
      setFile(null); // Clear selected file after upload attempt
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Upload Document (PDF)
      </h2>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".pdf"
          className="block w-full text-sm text-gray-900
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100 cursor-pointer rounded-full"
        />
        <button
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full
                     shadow-md hover:shadow-lg transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={uploadFile}
          disabled={loading || !file}
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </div>
      {uploadStatus && (
        <p
          className={`mt-4 text-sm font-medium ${
            uploadStatus.includes("failed") ? "text-red-600" : "text-green-600"
          }`}
        >
          {uploadStatus}
        </p>
      )}
    </div>
  );
}

export default DocumentUploaderComponent;
