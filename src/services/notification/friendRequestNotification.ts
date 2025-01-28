import { Server } from "socket.io";
import { emitNotification } from "./emitNotification";
import { ActivityTypes, NotificationType } from "../../constants/types";

/**
 *
 * @param {Server} io -- from request
 * @param {String} receiverId -- id of who will receive this notification
 * @param {String} status -- status of the friend request ("friend_request", "friend_request_accepted", "friend_request_rejected")
 * @param {{image: string, username: string, createAt: Date}} metaData -- image and username of sender
 */
const sendFriendRequestNotification = async (
    io: Server,
    receiverId: string,
    type: "friend_request" | "friend_request_accepted" | "friend_request_rejected",
    metaData?: any
) => {
    await emitNotification(io, receiverId, type, metaData);
};

export default sendFriendRequestNotification;
