import mongoose, { model } from "mongoose";
import IUser from "./user.type";
import { compare, hash } from "bcryptjs"

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    default: "",
    validate: {
      validator: (value) => {
        return /^\S+@\S+\.\S+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email`
    }
  },
  username: {
    type: String,
    required: true,
    default: ""
  },
  password: {
    type: String,
    required: true,
    default: ""
  }
}, {
  timestamps: true
})


userSchema.pre<IUser>('save', async function (next) {
  if (!(this as any).isModified('password')) return next();
  this.password = await hash(this.password, 10);
  next();
});


userSchema.methods.comparePassword = async function (hashedPassword: string) {
  return await compare(hashedPassword, this.password)
}

const User = model<IUser>('User', userSchema);
export default User;