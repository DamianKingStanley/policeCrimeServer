import commentModel from "../models/comment.js";

export const createComment = async (req, res) => {
  try {
    const { content, postId, createdBy, username, profilePicture } = req.body;
    const comment = await commentModel.create({
      content,
      post: postId,
      createdBy,
      username,
      profilePicture,
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await commentModel
      .find({ post: postId })
      .populate("createdBy");
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const comment = await commentModel.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    res.status(200).json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await commentModel.findByIdAndDelete(commentId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
