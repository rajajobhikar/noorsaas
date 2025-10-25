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
    // @ts-expect-error globalThis.server is set up by Next.js
    io = new Server(globalThis.server, {
      path: "/api/socketio",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("🧠 Socket connected:", socket.id);

      socket.on("ping", () => {
        socket.emit("pong");
      });

      // Add your custom events here
    });
  }

  return new Response("Socket.IO server running");
}
