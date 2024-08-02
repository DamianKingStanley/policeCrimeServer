import Notification from "../models/notification.js";
import { io } from "../index.js";

export const createNotification = async(message, type) => {
    try {
        const notification = new Notification({ message, type });
        await notification.save();
        io.emit("newNotification", notification);
    } catch (err) {
        console.error("Failed to create notification:", err.message);
    }
};

export const getUnreadNotifications = async(req, res) => {
    try {
        const notifications = await Notification.find({ read: false });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const markNotificationAsRead = async(req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            id, { read: true }, { new: true }
        );
        res.json(notification);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};