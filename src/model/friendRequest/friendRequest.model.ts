import mongoose, { model } from "mongoose";
import { IFriendRequest } from "./friendRequest.type";
import { allowedValues } from "../../constants/staticValues";

const friendRequestSchmea = new mongoose.Schema<IFriendRequest>({
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
  },
  status: {
      type: String,
      required: true,
      enum: allowedValues.FriendRequestStatus,
  }
}, {
      timestamps: true,
});

const FriendRequest = model<IFriendRequest>("FriendRequest", friendRequestSchmea);
export default FriendRequest;