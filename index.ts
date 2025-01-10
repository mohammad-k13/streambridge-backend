import express, { Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import routes from "./src/routes";
import { setupSocketIO } from "./src/socket";
import connectDB from "./src/services/db";
import { allStaticsValues } from "./src/constants/staticValues";
import StaticValues from "./src/model/staticValues/staticValues.model";
import User from "./src/model/user/user.model";
import { config } from "dotenv";

const app = express();
config();

app.use(cors({ origin: [process.env.CLIENT_URL as string] }));
app.use(express.json());

const server = http.createServer(app);

// Initialize Socket.io
setupSocketIO(server);

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
