import React, { useState, useEffect } from "react";
import DocumentUploader from "./components/DocumentuploaderComponent.jsx";
import SummaryComponent from "./components/SummaryComponent.jsx";
import ChatBoxComponent from "./components/ChatBoxComponent.jsx";
import "./index.css";

function Home() {
  const [uploadedFilename, setUploadedFilename] = useState("");
  const handleUploadSuccess = (filename) => {
    setUploadedFilename(filename);
    console.log(uploadedFilename + " " + filename);
  };

  useEffect(() => {
    if (uploadedFilename) console.log("State updated to:", uploadedFilename);
  }, [uploadedFilename]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans antialiased text-gray-900">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Gen AI Document Summarizer cum Analyzer
        </h1>
        <DocumentUploader onUploadSuccess={handleUploadSuccess} />
        <SummaryComponent filename={uploadedFilename} />
        <ChatBoxComponent />
      </div>
    </div>
  );
}

export default Home;
