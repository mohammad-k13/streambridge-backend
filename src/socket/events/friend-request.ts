import { Server } from "socket.io";
import { SocketWithUserId } from "..";
import CreateFriendRequest from "../../services/friend_request/create";

export const FriendRequestEvent = (io: Server, socket: SocketWithUserId) => {
    socket.on(
        "send-friend-request",
        async (
            { reciever_username }: { reciever_username: string },
            result_cb: (result: any) => void
        ) => {
            const result = await CreateFriendRequest(reciever_username, socket.userId);
            result_cb(result);

            //if result is okay!!
            // socket.
            //emit hanlder for reciveing notifiction
        }
    );
};
