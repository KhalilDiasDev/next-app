import { NextApiRequest } from "next";
import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req: NextApiRequest, res: any) {
  // Initialize Socket.io
  const io = new Server(res.socket?.server, {
    path: "/api/socket", // path to serve the Socket.io client
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (roomName) => {
      console.log("New client connected to room: ", roomName);

      socket.join(roomName);
    });

    socket.on("update", (data) => {
      // Send data to online clients
      socket.to(data.room).emit("update", data);
    });

    socket.on("mouseMove", (data) => {
      // Send data to online clients
      socket.to(data.room).emit("mouseMove", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  res.end();
}
