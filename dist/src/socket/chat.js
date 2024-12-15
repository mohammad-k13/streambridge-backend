"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatHandler = void 0;
const chatHandler = (io, socket) => {
    socket.on("send-message", ({ message, senderId }, room) => {
        const payload = { message };
        if (!room) {
            socket.broadcast.emit("receive-message", payload);
        }
        else {
            socket.to(room).emit("receive-message", payload);
        }
    });
};
exports.chatHandler = chatHandler;
