import { Server, Socket } from "socket.io";
import { SocketWithUserId } from "..";


export const assignUser = (io: Server, socket: SocketWithUserId ) => {
      socket.on("assign-user", async (message: string, senderId: string) => {
            if(!message || !senderId) return;

            console.log("senderId", senderId);
            console.log("message", message)
      })
}