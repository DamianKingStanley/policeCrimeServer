import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    userId: { type: String },
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    location: { type: String },
    profilePicture: { type: String },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
