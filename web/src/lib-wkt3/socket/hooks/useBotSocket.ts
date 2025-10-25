import { useEffect } from "react";
import { socket } from "../client";
import { BotStatus } from "@/types/Bot";

export function useBotSocket(
  setBots: React.Dispatch<React.SetStateAction<BotStatus[]>>
) {
  useEffect(() => {
    socket.on("bot_mirror", (data: BotStatus) => {
      console.log("🤖 Live bot update:", data);
      setBots((prev) => {
        const filtered = prev.filter((b) => b._id !== data._id);
        return [data, ...filtered];
      });
    });

    return () => {
      socket.off("bot_mirror");
    };
  }, [setBots]);
}
