import { Server } from "socket.io";
import { NotificationContent, NotificationMetaData, NotificationType } from "../../constants/types";
import Notification from "../../model/notification/notification.model";
import { OnlineUsers } from "../../socket";

/**
 * Emits a notification to the recipient via Socket.IO and saves it to the database.
 *
 * @param {Server} io(@type) - The Socket.IO server instance
 * @param {string} reciverId - The ID of the recipient of the notification.
 * @param {NotificationType} type - The type of notification to send. This corresponds to the predefined notification types.
 * @param {Object} [metaData={}] - Optional additional data associated with the notification, such as the details about the notification.
 *
 * @throws {Error} If there is an issue with the database creation or emitting the notification.
 *
 * @example
 * // Example usage to send a 'friend_request' notification
 * emitNotification(io, "recipientUserId", "friend_request", { friendName: "John Doe" });
 */
export const emitNotification = async <T extends NotificationType>(
    io: Server,
    reciverId: string,
    type: T,
    metaData: NotificationMetaData[T]
) => {
    try {
        const newNotification = await Notification.create({ type, userId: reciverId });

        const recieverSocketId = OnlineUsers.get(reciverId);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("notification:received", {
                id: newNotification._id,
                type,
                content: NotificationContent[type],
                isRead: false,
                metaData,
            });
        }
    } catch (err) {
        console.log("emitNotification", err);
    }
};