import mongoose from "mongoose";
import { AllowedValues } from "../../constants/staticValues";

export interface IConversationMember {
      role: AllowedValues['ConversationMemberRole'] | string,
      userId: mongoose.Schema.Types.ObjectId
}