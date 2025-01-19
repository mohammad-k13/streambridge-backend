import mongoose from "mongoose";
import { AllowedValues } from "../../constants/types";

export interface IMessageSeenStatus {
      status: AllowedValues['MessageReadStatus'] | string,
      messageId: mongoose.Schema.Types.ObjectId
}