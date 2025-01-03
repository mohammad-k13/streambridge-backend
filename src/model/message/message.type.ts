import mongoose from "mongoose";

export default interface IMessage {
    senderId: mongoose.Schema.Types.ObjectId;
    recieverId: mongoose.Schema.Types.ObjectId;
    message: string;
}
