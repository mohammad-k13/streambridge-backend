import mongoose, { model } from "mongoose";
import { IBlockedUsers } from "./blockedUser.type";

const blockedUserSchema = new mongoose.Schema<IBlockedUsers>({
  blockedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blockerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, {timestamps: true});

const BlockedUser = model<IBlockedUsers>("BlockedUser", blockedUserSchema);
export default BlockedUser;
