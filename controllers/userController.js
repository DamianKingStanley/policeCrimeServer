import userModel from "../models/user.js";
import postModel from "../models/post.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;

export const userRegister = async (req, res) => {
  try {
    const userInfo = req.body;
    const oldUser = await userModel.findOne({ email: userInfo.email });

    if (oldUser) {
      return res.status(401).json({ message: "email already exist" });
    }
    const hashPassword = await bcrypt.hash(userInfo.password, 12);
    const user = await userModel.create({
      fullname: userInfo.fullname,
      username: userInfo.username,
      email: userInfo.email,
      password: hashPassword,
    });
    console.log(userInfo);
    res.status(200).json({ message: "Registration succesfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const secret = process.env.JWT_SECRET;
    const userInfo = req.body;
    const oldUser = await userModel.findOne({ email: userInfo.email });
    if (!oldUser) {
      return res.status(401).json({ message: "wrong email" });
    }
    const checkPassword = await bcrypt.compare(
      userInfo.password,
      oldUser.password
    );
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid credential" });
    }
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "2d",
    });
    const formattedResult = {
      id: oldUser._id,
      email: oldUser.email,
      fullname: oldUser.fullname,
      username: oldUser.username,
    };
    res.status(200).json({ result: formattedResult, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user information
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const {
      fullname,
      username,
      phoneNumber,
      location,
      selectedProfilePicture,
    } = req.body;

    // let profilePicture = req.file ? req.file.path : null;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.fullname = fullname;
    user.username = username;
    user.location = location;
    user.phoneNumber = phoneNumber;
    user.profilePicture = selectedProfilePicture;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getUserProfile, updateUserProfile };

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await postModel.find({ userId });
    res.json({ userPosts });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePostByUser = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id; // Assuming you have middleware to extract user ID from the request

    // Check if the user has already liked the post
    const user = await UserModel.findById(userId);
    if (user.likedPosts.includes(postId)) {
      console.log("User has already liked this post.");
      return res
        .status(400)
        .json({ message: "You have already liked this post." });
    }

    // Add the liked post to the user's likedPosts array
    user.likedPosts.push(postId);
    await user.save();

    res.status(200).json({ message: "Post liked successfully." });
  } catch (error) {
    console.error("Error liking post by user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
