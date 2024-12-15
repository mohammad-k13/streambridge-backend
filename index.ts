import express, { Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import routes from "./routes";
import { setupSocketIO } from "./socket";

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// Initialize Socket.io
setupSocketIO(server);

app.get("/", (req: Request, res: Response) => {
  res.send("Socket.IO with Express and TypeScript");
});

app.use(routes)

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
