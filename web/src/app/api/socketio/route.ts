import { Server } from "socket.io";

// ✅ Use edge runtime for streaming/polling compatibility
export const runtime = "edge";

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

      socket.on("audit_push", (data) => {
        console.log("📜 Audit received:", data);
        io?.emit("audit_update", data);
      });
    });
  }

  return new Response("Socket.IO server running");
}
