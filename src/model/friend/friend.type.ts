import mongoose from "mongoose";

export interface IFriend {
      senderId: mongoose.Schema.Types.ObjectId,
      reciverId: mongoose.Schema.Types.ObjectId,
}