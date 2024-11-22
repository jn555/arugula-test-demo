import express from "express";
import http from "http"; // For creating an HTTP server
import { Server } from "socket.io"; // For real-time communication
import dotenv from "dotenv";
import connectDB from "./db";
import corsMiddleware from "./middleware/cors";
import boardRoutes from "./routes/boards";
import setupWebRTC from "./services/webrtc";

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(corsMiddleware); // Reusable CORS middleware

// Routes
app.use("/api/boards", boardRoutes);

// Connect to MongoDB
connectDB();

// Create an HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Setup WebRTC signaling
setupWebRTC(io);

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
