import { Server } from "socket.io";

const setupWebRTC = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle signaling data (offer, answer, ICE candidates)
    socket.on("signal", (data) => {
      const { to, signalData } = data;
      console.log(`Relaying signal from ${socket.id} to ${to}`);
      io.to(to).emit("signal", { from: socket.id, signalData });
    });

    // Notify peers when a user joins a room
    socket.on("join-room", (roomId) => {
      console.log(`User ${socket.id} joined room ${roomId}`);
      socket.join(roomId);

      // Notify other users in the room
      socket.to(roomId).emit("user-joined", socket.id);
    });

    // Notify peers when a user disconnects
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      io.emit("user-left", socket.id);
    });
  });
};

export default setupWebRTC;
