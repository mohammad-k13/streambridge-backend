import mongoose, { model } from "mongoose";
import { allowedValues } from "../../constants/types";
import { IActivityLog } from "./activityLog.type";

const activityLogSchema = new mongoose.Schema<IActivityLog>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        action: {
            type: String,
            enum: allowedValues.ActivityType,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ActivityLog = model<IActivityLog>("ActivityLog", activityLogSchema);
export default ActivityLog;
