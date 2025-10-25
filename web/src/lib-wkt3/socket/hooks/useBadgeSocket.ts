import { useEffect } from "react";
import { socket } from "../client";

interface BadgeUpdate {
  userId: string;
  badge: "verified" | "fair" | "trusted";
}

export function useBadgeSocket(updateBadge: (data: BadgeUpdate) => void) {
  useEffect(() => {
    socket.on("badge_mirror", (data: BadgeUpdate) => {
      console.log("🏅 Live badge update:", data);
      updateBadge(data);
    });

    return () => {
      socket.off("badge_mirror");
    };
  }, [updateBadge]);
}
