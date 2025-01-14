import { Server } from "socket.io";
import { NotificationContent, NotificationType } from "../../constants/staticValues";
import Notification from "../../model/notification/notification.model";
import { OnlineUsers } from "../../socket";

export const emitNotification = async (
    io: Server,
    reciverId: string,
    type: NotificationType,
    metaData: Object = {}
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
