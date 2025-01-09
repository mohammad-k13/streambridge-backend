import mongoose, { model } from "mongoose";
import { IConversationMember } from "./converstaionMember.type";
import { allowedValues } from "../../constants/staticValues";

const converstaionMemberSchema = new mongoose.Schema<IConversationMember>(
    {
        role: {
            type: String,
            required: true,
            enum: allowedValues.ConversationMemberRole,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);

const ConversationMember = model<IConversationMember>("ConversationMember", converstaionMemberSchema);
export default ConversationMember;
