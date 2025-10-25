import { FC } from "react";
import { BotStatus } from "@/types/Bot";

export const BotGalleryCard: FC<{ bot: BotStatus }> = ({ bot }) => {
  const statusColor = {
    online: "#00b894",
    idle: "#fdcb6e",
    busy: "#6c5ce7",
    offline: "#dfe6e9",
  }[bot.status];

  return (
    <div
      style={{
        border: `2px solid ${statusColor}`,
        borderRadius: "12px",
        padding: "1rem",
        width: "200px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ fontSize: "2.5rem" }}>{bot.avatar ?? "🤖"}</div>
      <div style={{ fontWeight: "bold", marginTop: "0.5rem" }}>{bot.name}</div>
      <div style={{ fontSize: "0.85rem", color: "#636e72" }}>
        {bot.personality?.flair ?? "No flair"}
      </div>
      <div style={{ fontSize: "0.75rem", color: "#b2bec3" }}>
        {bot.status} — {bot.task ?? "Idle"}
      </div>
    </div>
  );
};
