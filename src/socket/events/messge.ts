import { Server } from "socket.io";
import { OnlineUsers, SocketWithUserId } from "..";
import Message from "../../model/message/message.model";

export const messageEvents = (io: Server, socket: SocketWithUserId) => {
    socket.on("send-message", async ({ message = " ", recieverId }: { message: string; recieverId: string }, cb) => {
        const senderId = socket.userId;
        const reciever_socketId = OnlineUsers.get(recieverId);

        const saved_message = await Message.create({ recieverId, senderId, message, seen: false });
        const id = saved_message._id.toString()
        cb(message, id);

        if (!reciever_socketId) return;

        io.to(reciever_socketId).emit("recive-message", { message, id, senderId, createdAt: saved_message.createdAt});
    });
};
