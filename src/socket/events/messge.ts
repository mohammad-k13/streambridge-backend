import { Server } from "socket.io";
import { OnlineUsers, SocketWithUserId } from "..";
import Message from "../../model/message/message.model";

export const messageEvents = (io: Server, socket: SocketWithUserId) => {
    socket.on("send-message", async ({ message, recieverId }: { message: string; recieverId: string }, cb) => {
        const senderId = socket.userId;
        const reciever_socketId = OnlineUsers.get(recieverId);

        await Message.create({ recieverId, senderId, message, seen: false });

        if (!reciever_socketId) return;

        cb(message);
        io.to(reciever_socketId).emit("recive-message", { message, recieverId, senderId });
    });
};
