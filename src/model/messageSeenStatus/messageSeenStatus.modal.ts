import mongoose, { model } from "mongoose";
import { IMessageSeenStatus } from "./messageSeenStatus.type";
import { allowedValues } from "../../constants/staticValues";

const messageSeenStatusSchema = new mongoose.Schema<IMessageSeenStatus>({
    messageId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Message",
    },
    status: {
        type: String,
        required: true,
        enum: allowedValues.MessageReadStatus,
    },
}, {timestamps: true,});


const MessageSeenStatus = model<IMessageSeenStatus>('MessageSeenStatus', messageSeenStatusSchema);
export default MessageSeenStatus;
