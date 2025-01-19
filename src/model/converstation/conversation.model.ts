import mongoose, { model } from "mongoose";
import { IConversation } from "./conversation.type";
import { allowedValues } from "../../constants/types";

const converstaionSchema = new mongoose.Schema<IConversation>(
    {
        name: {
            type: String,
            required: false,
            default: "chat",
        },
        type: {
            type: String,
            required: true,
            enum: allowedValues.ConversationType
        },
    },
    {
        timestamps: true,
    }
);

const Conversation = model<IConversation>("Conversation", converstaionSchema);
export default Conversation;
