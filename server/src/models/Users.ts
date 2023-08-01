import { Schema, model, ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import env from "../utils/envalid";

export type UserSchema = {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const hashedPassword = await bcrypt.hash(this.password, env.SALT);
  this.password = hashedPassword;
});

export default model<UserSchema>("Users", userSchema);
