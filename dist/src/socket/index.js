"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketIO = void 0;
const socket_io_1 = require("socket.io");
const chat_1 = require("./chat");
const room_1 = require("./room");
const setupSocketIO = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:5173",
        },
    });
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
        // Chat-related events
        (0, chat_1.chatHandler)(io, socket);
        // Room-related events
        (0, room_1.roomHandler)(io, socket);
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
    return io;
};
exports.setupSocketIO = setupSocketIO;
