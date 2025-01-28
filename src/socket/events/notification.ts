import { Server } from "socket.io";
import { SocketWithUserId } from "..";
import Notification from "../../model/notification/notification.model";
import { INotification } from "../../model/notification/notification.type";

export const notificationEvents = (io: Server, socket: SocketWithUserId) => {
    socket.on(
        "notification:markAsRead",
        async ({ notificationId }: { notificationId: string }, cb: (message: string) => void) => {
            try {
                await Notification.findByIdAndUpdate(notificationId, { isReaded: true });
                cb("Notification marked as read")
                socket.emit("notification:status", { message: "Notification marked as read" });
            } catch (error) {
                console.error("Error marking notification as read:", error);
                socket.emit("notification:error", {
                    message: "Failed to mark notification as read",
                });
            }
        }
    );

    socket.on("notification:getAll", async (cb: (allNotifications: INotification) => void) => {
        const allNotifications = await Notification.find({userId: socket.userId}, {userId: 0}) as any;
        cb(allNotifications);
    });
};
