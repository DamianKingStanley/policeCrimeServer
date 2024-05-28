import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String },
    selectedChoice: { type: String },
    author: { type: String },
    title: { type: String },
    textAreaValue: { type: String },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    profilePicture: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("post", postSchema);
