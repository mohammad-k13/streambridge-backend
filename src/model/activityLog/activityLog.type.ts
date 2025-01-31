import mongoose from "mongoose";
import { AllowedValues } from "../../constants/types";

export interface IActivityLog {
      userId: mongoose.Schema.Types.ObjectId,
      action: AllowedValues['ActivityType'] | string
}