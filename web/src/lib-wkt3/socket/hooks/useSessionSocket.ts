import { useEffect } from "react";
import { socket } from "../client";
import { Session } from "@/types/Session";

export function useSessionSocket(
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>
) {
  useEffect(() => {
    socket.on("session_mirror", (data: Session) => {
      console.log("🪞 Live session update:", data);

      setSessions((prevSessions) => {
        const filtered = prevSessions.filter((s) => s._id !== data._id);
        return [data, ...filtered];
      });
    });

    return () => {
      socket.off("session_mirror");
    };
  }, [setSessions]);
}
