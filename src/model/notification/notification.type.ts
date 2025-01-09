import mongoose from "mongoose";
import { AllowedValues } from "../../constants/staticValues";

export interface INotification {
      userId: mongoose.Schema.Types.ObjectId,
      isReaded: boolean,
      type: AllowedValues['NotificationType'] | string,
}