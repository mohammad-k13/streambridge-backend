import { Server } from "socket.io";
import { SocketWithUserId } from "..";

export const messageEvents = (io: Server, socket: SocketWithUserId) => {
    socket.on("send-message", ({ message, recieverId }: { message: string; recieverId: string }, cb) => {
        const senderId = socket.userId; 

        if (!message || !recieverId) return;
        cb(message, senderId);
        socket.emit("recive-message", { message, recieverId, senderId });
    });
};
