import express from "express";
import { server } from "../index.js";
import { Server } from "socket.io";

export const socketSetup = () => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join", (id) => {
      socket.join(id);
      console.log(`Room id: ${id} was joined`);
    });

    socket.on("message", (data) => {
      const { roomId } = data;
      console.log(`message sent to room: ${roomId}`);
      socket.to(roomId).emit("receive", data);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
};
