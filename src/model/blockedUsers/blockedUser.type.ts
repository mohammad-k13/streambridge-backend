import mongoose from "mongoose";

export interface IBlockedUsers {
  blockedId: mongoose.Schema.Types.ObjectId;
  blockerId: mongoose.Schema.Types.ObjectId;
}
