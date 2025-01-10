import mongoose, { model } from "mongoose";
import { INotification } from "./notification.type";
import { allowedValues } from "../../constants/staticValues";

const notificationSchema = new mongoose.Schema<INotification>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: allowedValues.NotificationType,
            required: true,
        },
        isReaded: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Notification = model<INotification>("Notification", notificationSchema);
export default Notification;
