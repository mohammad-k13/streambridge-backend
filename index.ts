import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import routes from "./src/routes";
import { setupSocketIO } from "./src/socket";
import connectDB from "./src/services/db";
import { config } from "dotenv";
import { RequestWithPayload } from "./src/routes/user.controller";
import Notification from "./src/model/notification/notification.model";
import FriendRequest from "./src/model/friendRequest/friendRequest.model";
import Friend from "./src/model/friend/friend.model";

const app = express();
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
config({ path: envFile });

app.use(cors({ origin: [process.env.CLIENT_URL as string] }));
app.use(express.json());

const server = http.createServer(app);

// Initialize Socket.io
const io = setupSocketIO(server);

app.use((req: RequestWithPayload, res, next) => {
    req.io = io;
    next();
})

app.get("/", (req: Request, res: Response) => {
    res.send("Socket.IO with Express and TypeScript");
});

app.use(routes);

const PORT = 8080;
connectDB().then(async () => {
    console.log("connect to MongoDB");
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
