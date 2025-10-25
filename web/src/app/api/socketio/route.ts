import { Server } from "socket.io";
// ✅ Use edge runtime for streaming/polling compatibility
export const runtime = "edge";


interface BadgeUpdate {
  userId: string;
  badge: "verified" | "fair" | "trusted";
}
interface BotUpdate {
  _id: string;
  name: string;
  status: "online" | "offline" | "idle" | "busy";
  task?: string;
  lastPing: string;
}


let io: Server | null = null;

export async function GET() {
  if (!io) {
    // @ts-expect-error globalThis.server is injected by Next.js
    io = new Server(globalThis.server, {
      path: "/api/socketio",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("🧠 Socket connected:", socket.id);
      socket.emit("welcome", { message: "Welcome to wkt3 real-time!" });
      socket.on("session_update", (sessionData) => {
        console.log("🪞 Session update received:", sessionData);

        // Broadcast to all clients (or filter by role if needed)
        io?.emit("session_mirror", sessionData);
      });

      socket.on("badge_update", (data: BadgeUpdate) => {
        console.log("🏅 Badge update:", data);
        io?.emit("badge_mirror", data);
      });

      socket.on("bot_status", (data: BotUpdate) => {
        console.log("🤖 Bot status update:", data);
        io?.emit("bot_mirror", data);
      });


      socket.on("audit_push", (data) => {
        console.log("📜 Audit received:", data);
        io?.emit("audit_update", data);
      });
    });
  }
  return new Response("Socket.IO server running");
}
