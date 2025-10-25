/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "socket.io";
import { NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

let io: Server | null = null;

export async function GET(req: NextRequest) {
  if (!io) {
    // @ts-expect-error globalThis.server is set up in middleware.ts
    io = new Server(globalThis.server, {
      path: "/api/socketio",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("🧠 Socket connected:", socket.id);

      // 🔥 Emit welcome message
      socket.emit("welcome", { message: "Welcome to wkt3 real-time!" });

      // 🔥 Listen for audit_push
      socket.on("audit_push", (data) => {
        console.log("📜 Audit received:", data);

        // 🔥 Broadcast to all clients
        io?.emit("audit_update", data);
      });
    });
  }

  return new Response("Socket.IO server running");
}
