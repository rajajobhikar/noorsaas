import { FC } from "react";
import { BotStatus } from "@/types/Bot";

export const BotCard: FC<{ bot: BotStatus }> = ({ bot }) => {
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
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div style={{ fontSize: "2rem" }}>{bot.avatar ?? "🤖"}</div>
      <div>
        <div style={{ fontWeight: "bold" }}>{bot.name}</div>
        <div style={{ fontSize: "0.85rem", color: "#636e72" }}>
          {bot.status} — {bot.task ?? "Idle"}
        </div>
        <div style={{ fontSize: "0.75rem", color: "#b2bec3" }}>
          Last ping: {new Date(bot.lastPing).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
