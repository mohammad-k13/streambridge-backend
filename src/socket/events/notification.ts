import { Server } from "socket.io";
import { SocketWithUserId } from "..";
import Notification from "../../model/notification/notification.model";

export const notificationEvents = (io: Server, socket: SocketWithUserId) => {
    socket.on(
        "notification:markAsRead",
        async ({ notificationId }: { notificationId: string }) => {
            try {
                await Notification.findByIdAndUpdate(notificationId, { status: "read" });
                socket.emit("notification:status", { message: "Notification marked as read" });
            } catch (error) {
                console.error("Error marking notification as read:", error);
                socket.emit("notification:error", {
                    message: "Failed to mark notification as read",
                });
            }
        }
    );

    socket.on("notification:getAll", async () => {
        const allNotifications = await Notification.find();
        socket.emit("notification:all", allNotifications);
    });
};
