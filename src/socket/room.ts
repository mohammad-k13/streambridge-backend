import { Server, Socket } from "socket.io";

export const roomHandler = (io: Server, socket: Socket) => {
  socket.on("join-room", (roomId, cb) => {
    socket.join(roomId);
    cb(`Joined ${roomId}`);
  });

  socket.on("leave-room", (roomId, cb) => {
    socket.leave(roomId);
    cb(`Left ${roomId}`);
  });
};
