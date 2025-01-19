import mongoose from "mongoose";
import { AllowedValues } from "../../constants/types";

export interface IFriendRequest {
    senderId: mongoose.Schema.Types.ObjectId;
    recieverId: mongoose.Schema.Types.ObjectId;
    status: AllowedValues["FriendRequestStatus"] | string;
    createAt: Date
}
