import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), expires: 3600 }, // 1 hour
});

const token = mongoose.model.token || mongoose.model("token", tokenSchema);

export default mongoose.model("User", userSchema);