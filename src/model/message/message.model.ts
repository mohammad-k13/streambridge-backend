import mongoose, { model } from "mongoose";
import IMessage from "./message.type";

const messageSchema = new mongoose.Schema<IMessage>(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        recieverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        seen: {
            type: Boolean,
            required: true,
            default: false,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Message = model<IMessage>("Message", messageSchema);
export default Message;
