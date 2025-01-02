import mongoose, { model } from "mongoose";
import ISession from "./session.type";
import { compare, hash } from "bcryptjs";

const sessionSchema = new mongoose.Schema<ISession>(
  {
    sessionToken: {
      type: String,
      required: true,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: "",
    },
    expires: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

sessionSchema.pre<ISession>("save", async function (next) {
  if (!(this as any).isModified("sessionToken")) return next();
  this.sessionToken = await hash(this.sessionToken, Number(process.env.SAULT));
});

sessionSchema.methods.compareSessionToken = async function (hashedSessionToken: string) {
  return await compare(hashedSessionToken, this.sessionToken)
}

const Session = model<ISession>("Session", sessionSchema);
export default Session;
