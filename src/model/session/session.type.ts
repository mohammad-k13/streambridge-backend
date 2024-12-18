import mongoose from "mongoose";

interface ISession {
  sessionToken: string,
  userId: mongoose.Schema.Types.ObjectId,
  expires: Date,
}

export default ISession;