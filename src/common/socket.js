// socketService.js
import { io } from "socket.io-client";

let socket;

export const connectSocket = (url, userId) => {
  if (!socket) {
    socket = io(url, {
      transports: ["websocket"],
      query: { userId }, // Pass the user ID during the connection
      upgrade: false,
    });

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
