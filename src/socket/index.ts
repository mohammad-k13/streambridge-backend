import { Server, Socket } from "socket.io";
import { chatHandler } from "./chat";
import { roomHandler } from "./room";

export const setupSocketIO = (server: any) => {
  const io = new Server(server);
  // const io = new Server(server, {
  //   cors: {
  //     origin: "http://localhost:3000",
  //   },
  // });

  // io.on("connection", (socket: Socket) => {
    // console.log("A user connected:", socket.id);

    // Chat-related events
    // chatHandler(io, socket);

    // // Room-related events
    // roomHandler(io, socket);

    // socket.on("disconnect", () => {
    //   console.log("User disconnected:", socket.id);
    // });
  // });

  return io;
};
