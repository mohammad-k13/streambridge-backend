import mongoose from "mongoose";
import { AllowedValues } from "../../constants/staticValues";

export interface IMessageSeenStatus {
      status: AllowedValues['MessageReadStatus'] | string,
      messageId: mongoose.Schema.Types.ObjectId
}