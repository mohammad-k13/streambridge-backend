import { Server } from "socket.io";
import { emitNotification } from "./emitNotification";


/**
 * 
 * @param {Server} io -- from request
 * @param {String} reciverId -- id of who will receiver this notificaion
 * @param {{image: string, username: string}} metaData -- image and username of sender
 */
const friendRequestNotification = async (
    io: Server,
    reciverId: string,
    metaData: { image: string; username: string, createAt: Date }
) => {
    await emitNotification(io, reciverId, "friend_request", metaData);
};

export default friendRequestNotification;
