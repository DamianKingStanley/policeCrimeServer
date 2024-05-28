import express from "express";

const router = express.Router();

import {
    createPost,
    fetchAllPost,
    editPost,
    deletePost,
    getSinglePost,
    getPostsByUser,
    getPostByAnyUser,
    likePost,
    fetchLikes,
    updateViewCount,
} from "../controllers/postController.js";

import auth from "../middleware/auth.js";

router.post("/posts", auth, createPost);
router.get("/posts", fetchAllPost);
router.put("/posts/edit/:id", auth, editPost);
router.delete("/posts/edit/:id", auth, deletePost);
router.get("/post/:id", getSinglePost);
router.get("/posts/:userId", getPostsByUser);
router.get("writers/:userId/posts", getPostByAnyUser);
router.put("/posts/:postId/like", likePost);
router.get("/posts/like", fetchLikes);
router.post("/posts/:postId/view", updateViewCount);

export default router;