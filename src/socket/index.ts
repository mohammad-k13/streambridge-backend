import { Server, Socket } from "socket.io";
import { assignUser } from "./events/assign-user";
import { socketAuthMiddleware } from "../middleware/socket-auth.middleware";
import { messageEvents } from "./events/messge";

export interface SocketWithUserId extends Socket {
    userId: string;
}

export const setupSocketIO = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    io.use(socketAuthMiddleware);

    io.on("connection", (socket: Socket) => {
        assignUser(io, socket as SocketWithUserId);
        messageEvents(io, socket as SocketWithUserId);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
};
