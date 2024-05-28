import express from "express";
import auth from "../middleware/auth.js";
import {
  userRegister,
  login,
  getUserProfile,
  updateUserProfile,
  likePostByUser,
  getUserPosts,
  getUserById,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/user/register", userRegister);
router.post("/user/login", login);
router.get("/user/profile/:userId", getUserProfile);
router.post("/user/like-post", likePostByUser);
router.get("/user/:userId/posts", getUserPosts);
router.get("/user/:userId", getUserById);
router.get("/users", getAllUsers);

// Update user profile with profile picture
router.put("/user/profile/:userId/update", auth, updateUserProfile);

export default router;
