"use client";

import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

const VideoChat = () => {
  const socket = useRef<any>();
  const localStream = useRef<MediaStream | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnections = useRef<{ [id: string]: RTCPeerConnection }>({});

  const [roomId, setRoomId] = useState<string>("default-room");
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    // Connect to the Socket.IO server
    socket.current = io("http://localhost:5000");
    console.log("at start");
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      console.log("Available devices:", devices);
    });

    // Handle incoming signals
    socket.current.on("signal", async ({ from, signalData }: any) => {
      if (!peerConnections.current[from]) {
        peerConnections.current[from] = createPeerConnection(from);
      }

      const pc = peerConnections.current[from];
      if (signalData.type === "offer") {
        await pc.setRemoteDescription(new RTCSessionDescription(signalData));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.current.emit("signal", {
          to: from,
          signalData: pc.localDescription,
        });
      } else if (signalData.type === "answer") {
        await pc.setRemoteDescription(new RTCSessionDescription(signalData));
      } else if (signalData.candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(signalData));
      }
    });
    console.log("in user joined");

    // Handle user joining the room
    socket.current.on("user-joined", (userId: string) => {
      console.log(`User joined: ${userId}`);
      setUsers((prev) => [...prev, userId]);
      if (!peerConnections.current[userId]) {
        peerConnections.current[userId] = createPeerConnection(userId);
      }
    });

    // Handle user leaving the room
    socket.current.on("user-left", (userId: string) => {
      console.log(`User left: ${userId}`);
      if (peerConnections.current[userId]) {
        peerConnections.current[userId].close();
        delete peerConnections.current[userId];
      }
      setUsers((prev) => prev.filter((id) => id !== userId));
    });

    // Get local media stream
    console.log("in user.getmediadevices");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStream.current = stream;
        const localVideo = document.getElementById(
          "local-video",
        ) as HTMLVideoElement;
        if (localVideo) localVideo.srcObject = stream;
        console.log("within user.getmediadevices");
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const createPeerConnection = (userId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    localStream.current
      ?.getTracks()
      .forEach((track) => pc.addTrack(track, localStream.current!));

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("signal", {
          to: userId,
          signalData: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return pc;
  };

  const joinRoom = () => {
    socket.current.emit("join-room", roomId);
  };

  return (
    <div>
      <h1>Video Chat</h1>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter room ID"
      />
      <button onClick={joinRoom}>Join Room</button>
      <div>
        <video id="local-video" autoPlay playsInline muted />
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
    </div>
  );
};

export default VideoChat;
