import mongoose, { model, mongo } from "mongoose";
import { IFriend } from "./friend.type";

const friendSchema = new mongoose.Schema<IFriend>({
    reciverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
  },
});

const Friend = model<IFriend>("Friend", friendSchema);
export default Friend;
