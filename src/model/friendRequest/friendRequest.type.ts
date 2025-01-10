import mongoose from "mongoose";
import { AllowedValues } from "../../constants/staticValues";

export interface IFriendRequest {
    senderId: mongoose.Schema.Types.ObjectId;
    recieverId: mongoose.Schema.Types.ObjectId;
    status: AllowedValues["FriendRequestStatus"] | string;
}
