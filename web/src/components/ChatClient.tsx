"use client";
import { useEffect, useState } from "react";
import { socket } from "@/lib-wkt3/socket/client";
import { ChatBubble } from "@/components/ChatBubble";
import { ChatMessage } from "@/types/ChatMessage";

export default function ChatClient({ botId }: { botId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("join_bot_chat", { botId, userId: "abc123" });

    socket.on("chat_message", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat_message");
    };
  }, [botId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const msg: ChatMessage = {
      _id: crypto.randomUUID(),
      from: "user",
      userId: "abc123",
      botId,
      text: input,
      timestamp: new Date().toISOString(),
      verified: true,
    };
    socket.emit("chat_message", msg);
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Chat with Bot</h1>
      <div className="space-y-2">
        {messages.map((msg) => (
          <ChatBubble key={msg._id} msg={msg} />
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage(); // ✅ Enter key sends message
          }}
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
