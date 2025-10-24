import { Server } from "socket.io";
import type { Server as NetServer } from "http";
import type { NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

let io: Server | null = null;

export default function handler(req: any, res: NextApiResponse) {
  if (res.socket && !(res.socket as any).server.io) {
    const httpServer: NetServer = (res.socket as any).server;
    io = new Server(httpServer, {
      path: "/api/socketio",
      addTrailingSlash: false,
    });

    (res.socket as any).server.io = io;

    io.on("connection", (socket) => {
      console.log("🧠 Superadmin connected:", socket.id);
    });
  }
  res.end();
}
