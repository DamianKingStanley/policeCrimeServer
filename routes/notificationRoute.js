import express from "express";
import {
    getUnreadNotifications,
    markNotificationAsRead,
} from "../controllers/notificationController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get(
    "/notifications",
    auth(["admin", "officer"]),
    getUnreadNotifications
);
router.patch(
    "/notifications/:id",
    auth(["admin", "officer"]),
    markNotificationAsRead
);

export default router;