import { Schema, model, ObjectId } from "mongoose";

export type BlogSchema = {
  _id: ObjectId;
  title: string;
  body: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

const blogsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<BlogSchema>("Blogs", blogsSchema);
