"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./src/routes"));
const socket_1 = require("./src/socket");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
// Initialize Socket.io
(0, socket_1.setupSocketIO)(server);
app.get("/", (req, res) => {
    res.send("Socket.IO with Express and TypeScript");
});
app.use(routes_1.default);
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
