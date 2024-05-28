import express from "express";
const router = express.Router();

import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

router.post("/:postId/comments", createComment);
router.get("/comments/:postId", getCommentsByPost);
router.put("/:postId/comments/:commentId", updateComment);
router.delete("/:postId/comments/:commentId", deleteComment);

export default router;
