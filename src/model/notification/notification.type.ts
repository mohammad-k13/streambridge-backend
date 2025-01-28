import mongoose from "mongoose";
import { AllowedValues } from "../../constants/types";

export interface INotification {
      _id?: mongoose.Schema.Types.ObjectId,
      userId: mongoose.Schema.Types.ObjectId,
      isReaded: boolean,
      type: AllowedValues['NotificationType'] | string,
}