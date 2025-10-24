"use client";
import { useState } from "react";
import axios from "axios";

export default function NewDocumentPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("match");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState(`{
  "score": 100,
  "players": ["user1", "user2"],
  "result": "user1 won"
}`);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedContent = JSON.parse(content);
      await axios.post("http://localhost:8080/documents/create", {
        owner_id: "WKT3-207322-895", // You can make this dynamic later
        title,
        type,
        tags: tags.split(",").map((tag) => tag.trim()),
        content: parsedContent,
      });
      alert("Document saved successfully!");
      setTitle("");
      setType("match");
      setTags("");
      setContent("{}");
      setError("");
    } catch (err) {
      setError("❌ Invalid JSON in content field. Please fix it.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Create New Document</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Type (e.g. match, media)"
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="border p-2 w-full rounded"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='{"score": 100}'
        className="border p-2 w-full h-40 rounded font-mono"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Document
      </button>
    </div>
  );
}
