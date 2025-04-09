// pages/api/socket.js
import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
    res.end();
    return;
  }
  console.log("Initializing Socket.IO");
  const io = new Server(res.socket.server);

  // Attach the Socket.IO instance to avoid re‑initialization
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("Client connected", socket.id);

    // Listen for incoming messages from a client
    socket.on("message", (msg) => {
      console.log("Message received:", msg);
      // Broadcast the message to all other connected clients
      socket.broadcast.emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });

  res.end();
}