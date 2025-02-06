import { Server, Socket } from "socket.io";
import { socketAuthMiddleware } from "../middleware/socket-auth.middleware";
import { messageEvents } from "./events/messge";
import { notificationEvents } from "./events/notification";

export interface SocketWithUserId extends Socket {
    userId: string;
}

export const OnlineUsers = new Map();

export const setupSocketIO = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.use(socketAuthMiddleware);

    io.on("connection", (socket: Socket) => {
        const userId = (socket as SocketWithUserId).userId;

        if (userId) {
            OnlineUsers.set(userId, socket.id);
            console.log(`User ${userId} connected to socket ${socket.id}`);
        }
        messageEvents(io, socket as SocketWithUserId);
        notificationEvents(io, socket as SocketWithUserId);

        socket.on("disconnect", () => {
            OnlineUsers.delete(userId);
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
};
