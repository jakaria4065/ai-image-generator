import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setImageUrl(data.image);
    } catch (error) {
      console.error("Error generating image:", error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">AI Image Generator</h1>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded w-full max-w-md mb-4"
        placeholder="Describe your image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={generateImage}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading || !prompt}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {imageUrl && (
        <img src={imageUrl} alt="Generated" className="mt-4 max-w-full rounded" />
      )}
    </main>
  );
      }
