import { Server, Socket } from "socket.io";

export const chatHandler = (io: Server, socket: Socket) => {
  socket.on("send-message", ({ message, senderId }, room) => {
    const payload = { message };

    if (!room) {
      socket.broadcast.emit("receive-message", payload);
    } else {
      socket.to(room).emit("receive-message", payload);
    }
  });
};
