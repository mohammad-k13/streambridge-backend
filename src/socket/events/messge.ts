import { Server } from "socket.io";
import { SocketWithUserId } from "..";
import Message from "../../model/message/message.model";

export const messageEvents = (io: Server, socket: SocketWithUserId) => {
    socket.on("send-message", async ({ message, recieverId }: { message: string; recieverId: string }, cb) => {
        const senderId = socket.userId;

        if (!message || !recieverId) return;
        cb(message, senderId);
        socket.broadcast.emit("recive-message", { message, recieverId, senderId });
        await Message.create({recieverId, senderId, message});
    });
};
