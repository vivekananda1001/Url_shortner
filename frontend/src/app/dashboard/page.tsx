// src/app/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [originalLink, setOriginalLink] = useState("");
  const [shortenedLink, setShortenedLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  type shortenedresponse = {
    shortenedUrl: string
  };

  const handleShorten = async () => {
    if (!originalLink) {
      alert("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post<shortenedresponse>("http://localhost:3000/api/shorten", {
        url: originalLink
      });
      setShortenedLink(response.data.shortenedUrl);
    } catch (err) {
      setError("Error shortening the URL. Please try again.");
    }
    
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (shortenedLink) {
      navigator.clipboard.writeText(shortenedLink);
      alert("Shortened URL copied to clipboard!");
    }
  };

  return (
    <div className="bg-gray-300 flex justify-center items-center h-screen">
      <div className="bg-white m-2 p-8 rounded-lg min-w-[20%] flex flex-col">
        <div className="text-4xl font-bold flex justify-center items-center bg-yellow-400 rounded-lg p-4">
          Welcome to TinyURL!
        </div>

        <div className="text-2xl mt-5 font-bold flex flex-col">
          <div className="flex items-center">
            <label className="mr-2 w-30">Enter URL:</label>
            <input
              className="flex-1 m-2 font-normal text-xl bg-gray-200 rounded-sm p-2 pl-4 placeholder-gray-400 opacity-90"
              placeholder="eg: https://example.com"
              value={originalLink}
              onChange={(e) => setOriginalLink(e.target.value)}
            />
          </div>

          <button
            onClick={handleShorten}
            className="bg-yellow-400 rounded-lg p-2 font-bold text-white mt-2 hover:bg-yellow-500 hover:text-black cursor-pointer"
          >
            {loading ? "Shortening..." : "Shorten"}
          </button>

          {error && <div className="text-red-500 mt-2">{error}</div>}

          {shortenedLink && (
            <div className="mt-4">
              <div className="text-xl font-bold">Shortened URL:</div>
              <div className="text-blue-500 mt-2">{shortenedLink}</div>
              <button
                onClick={copyToClipboard}
                className="bg-blue-500 text-white rounded-md p-3 mt-2 hover:bg-blue-600"
              >
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
