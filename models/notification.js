import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    type: { type: String, enum: ["info", "critical"], required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

export default mongoose.model("Notification", notificationSchema);