import mongoose from "mongoose";

interface ISession {
  sessionToken: string,
  userId: mongoose.Schema.Types.ObjectId,
  expires: Date,

  compareSessionToken: (hashedSessionToken: string) => boolean,
}

export default ISession;