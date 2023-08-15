import { Schema, model, ObjectId, Types } from "mongoose";

export type TokenSchema = {
  _id: ObjectId;
  userId: Types.ObjectId;
  token: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

const tokenSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<TokenSchema>("UserToken", tokenSchema);
