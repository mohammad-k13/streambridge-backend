import { Server, Socket } from "socket.io";
import { socketAuthMiddleware } from "../middleware/socket-auth.middleware";
import { messageEvents } from "./events/messge";

export interface SocketWithUserId extends Socket {
    userId: string;
}


//todo: make a local var => map
//todo: store data in this format => userId: socket.id
//todo: in every connection update this

export const setupSocketIO = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    io.use(socketAuthMiddleware);

    io.on("connection", (socket: Socket) => {
        messageEvents(io, socket as SocketWithUserId);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
};
