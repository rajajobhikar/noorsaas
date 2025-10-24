"use client";
import { useState } from "react";
import axios from "axios";

export default function NewDocumentPage() {
  // 🔸 Form ke fields ke liye state variables
  const [title, setTitle] = useState("");
  const [type, setType] = useState("match");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState(`{
  "score": 100,
  "players": ["user1", "user2"],
  "result": "user1 won"
}`);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔸 Jab user "Save" button dabaye
  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    // 🔍 Check karo sab fields bhare hain ya nahi
    if (!title || !type || !tags || !content) {
      setError("❌ All fields are required.");
      return;
    }

    try {
      // 🔍 Content ko JSON format mein convert karo
      const parsedContent = JSON.parse(content);

      // 🔗 Backend ko data bhejna
      await axios.post("http://localhost:8080/documents/create", {
        owner_id: "WKT3-207322-895", // 🔐 Future mein session se dynamic ho sakta hai
        title,
        type,
        tags: tags.split(",").map((tag) => tag.trim()), // 🔍 Tags ko array mein convert karo
        content: parsedContent,
      });

      // ✅ Success message aur form reset
      setSuccess("✅ Document saved successfully!");
      setTitle("");
      setType("match");
      setTags("");
      setContent("{}");
    } catch (err) {
      // ❌ Agar JSON galat ho toh error dikhana
      setError("❌ Invalid JSON in content field.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Create New Document</h2>

      {/* 🔸 Title input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 w-full rounded"
      />

      {/* 🔸 Type input */}
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Type (e.g. match, media)"
        className="border p-2 w-full rounded"
      />

      {/* 🔸 Tags input */}
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="border p-2 w-full rounded"
      />

      {/* 🔸 Content textarea */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='{"score": 100}'
        className="border p-2 w-full h-40 rounded font-mono"
      />

      {/* 🔸 Error aur Success messages */}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      {/* 🔸 Submit button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Document
      </button>
    </div>
  );
}
