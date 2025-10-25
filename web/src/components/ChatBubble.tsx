import { FC } from "react";
import { ChatMessage } from "@/types/ChatMessage";

export const ChatBubble: FC<{ msg: ChatMessage }> = ({ msg }) => {
  const isBot = msg.from === "bot";
  const bg = isBot ? "#dfe6e9" : "#a29bfe";
  const align = isBot ? "flex-start" : "flex-end";

  return (
    <div style={{ display: "flex", justifyContent: align }}>
      <div
        style={{
          backgroundColor: bg,
          padding: "0.5rem 1rem",
          borderRadius: "12px",
          maxWidth: "70%",
          marginBottom: "0.5rem",
        }}
      >
        <p style={{ margin: 0 }}>{msg.text}</p>
        {msg.verified && (
          <span style={{ fontSize: "0.7rem", color: "#00b894" }}>
            ✅ Verified
          </span>
        )}
      </div>
    </div>
  );
};
