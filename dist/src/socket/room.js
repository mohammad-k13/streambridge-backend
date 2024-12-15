"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomHandler = void 0;
const roomHandler = (io, socket) => {
    socket.on("join-room", (roomId, cb) => {
        socket.join(roomId);
        cb(`Joined ${roomId}`);
    });
    socket.on("leave-room", (roomId, cb) => {
        socket.leave(roomId);
        cb(`Left ${roomId}`);
    });
};
exports.roomHandler = roomHandler;
