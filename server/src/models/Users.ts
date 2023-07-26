import { Schema, model, ObjectId } from "mongoose";

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
    },
  },
  { timestamps: true }
);

export default model<UserSchema>("Users", userSchema);
