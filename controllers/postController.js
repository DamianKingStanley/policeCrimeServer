import postModel from "../models/post.js";

//create posts
export const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = await postModel.create(post);
    console.log(post);
    res.status(200).json({ message: "post sent succesfully", newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// fetch all post
export const fetchAllPost = async (req, res) => {
  try {
    const fetchPosts = await postModel
      .find({})
      .populate("userId", "userId profilePicture"); // Include userId field in populate
    res.status(200).json({ message: "successful", fetchPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// edit post
export const editPost = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const updatePosts = await postModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updatePosts);
    res.status(200).json({ message: "Updated succesfully", updatePosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// delete post
export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await postModel.findByIdAndRemove(id);

    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// single post
export const getSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const SinglePost = await postModel.findById(id);
    console.log(SinglePost);
    res.status(200).json({ message: "Fetch succesfully", SinglePost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// posts by a user
export const getPostsByUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const posts = await postModel.find({ userId: userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// posts by any user
export const getPostByAnyUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const userPosts = await postModel.find({ userId: userId });

    res.status(200).json(userPosts);

    // if (userPosts.length === 0) {
    //   return res.status(404).json({
    //     message: "No posts found for the specified user ID.",
    //   });
    // }

    // console.log("Posts:", userPosts);
    // res.status(200).json({
    //   userPosts: userPosts,
    // });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Like posts

// Controller to like a post
export const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find the post by postId and update the likes count
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// fetch liked posts
export const fetchLikes = async (req, res) => {
  try {
    const postsWithLikes = await postModel.find({}, { likes: 1 });

    res.status(200).json(postsWithLikes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller for updating the view count of a post
export const updateViewCount = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find the post by postId and update the views count
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { $inc: { views: 1 } }, // Increment the views count by 1
      { new: true } // Return the updated post
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post views:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// controller for comments

export const createComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content } = req.body;

    // Create a new comment
    const newComment = await postModel.create({
      postId,
      content,
      createdAt: new Date(), // Include the current timestamp
    });

    // Update the post model with the new comment
    const post = await postModel.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment } }, // Push the new comment into the comments array
      { new: true }
    );

    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
