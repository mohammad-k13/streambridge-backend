import mongoose from "mongoose";
import { AllowedValues } from "../../constants/types";

export interface IConversationMember {
      role: AllowedValues['ConversationMemberRole'] | string,
      userId: mongoose.Schema.Types.ObjectId
}