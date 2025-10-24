"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DocumentList() {
  const [docs, setDocs] = useState([]);
  const [type, setType] = useState("");
  const [tag, setTag] = useState("");

  // 🔍 Search documents from backend
  const fetchDocs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/documents/search", {
        params: { type, tag },
      });
      setDocs(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // 🔄 Auto load all documents on first render
  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Search Documents</h2>

      {/* 🔸 Search filters */}
      <input
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Type"
        className="border p-2"
      />
      <input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tag"
        className="border p-2 ml-2"
      />
      <button
        onClick={fetchDocs}
        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
      >
        Search
      </button>

      {/* 🔸 Results */}
      {docs.map((doc: any) => (
        <div key={doc._id} className="border p-4 rounded mt-4">
          <h3 className="font-semibold">{doc.title}</h3>
          <p>Type: {doc.type}</p>
          <p>Tags: {doc.tags?.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
