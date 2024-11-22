import mongoose, { Document, Schema } from "mongoose";

interface IPost extends Document {
  title: string;
  content: string;
  boardId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  userId: string;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
});

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
