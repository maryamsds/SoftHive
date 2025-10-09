// PictureGenerate.jsx
import React, { useState } from "react";

export default function PictureGenerate() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/api/generate-image"; // ⚠️ apne backend ka URL yahan do

  // Generate image
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("⚠️ Please enter a prompt.");
      return;
    }
    setError(null);
    setLoading(true);
    setImageUrl(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate image. Try again.");
      }

      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Clear input & image
  const handleClear = () => {
    setPrompt("");
    setImageUrl(null);
    setError(null);
  };

  // Download image
  const handleDownload = async () => {
    if (!imageUrl) return;
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "generated-image.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      alert("⚠️ Failed to download image.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">✨ AI Picture Generator</h2>

      {/* Input & Buttons */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='e.g. "A futuristic city at sunset"'
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Clear
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      {/* Preview Area */}
      <div className="border rounded p-4 bg-white min-h-[250px] flex items-center justify-center">
        {loading ? (
          <p className="text-gray-500">⏳ Generating image...</p>
        ) : imageUrl ? (
          <div className="text-center">
            <img
              src={imageUrl}
              alt="Generated"
              className="rounded shadow max-h-[400px] mx-auto"
            />
            <button
              onClick={handleDownload}
              className="mt-3 px-4 py-2 border rounded hover:bg-gray-100"
            >
              ⬇️ Download
            </button>
          </div>
        ) : (
          <p className="text-gray-400">
            No image yet — enter a prompt and click <b>Generate</b>.
          </p>
        )}
      </div>
    </div>
  );
}
