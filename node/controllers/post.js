const Post = require('../models/post');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.BACK_END_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


module.exports.createPost = async (req, res) => {
    try {
        console.log(req.body);
        const {content } = req.body;

        // Validate the presence of all required fields
        if (!content) {
            return res.status(400).json({ success: false, message: 'Content is required' });
        }
        if (!req.user.id) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const newPost = new Post({
            content,
            userId: req.user.id
        });

        await newPost.save();
        res.status(200).json({ success: true, message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while creating the post' });
    }
};


module.exports.updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        if (post.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'You do not have permission to edit this post' });
        }

        post.content = content;
        await post.save();
        res.status(200).json({ success: true, message: 'Post updated successfully', post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while updating the post' });
    }
};

module.exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        if (post.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'You do not have permission to delete this post' });
        }

        await await Post.deleteOne({ _id: postId });
        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the post',error: error.message});
    }
};

module.exports.getUserPosts = async (req, res) => {
  try {
    // Retrieve user ID from request object (assuming it's stored in req.user)
    const userId = req.user.id;

    // Query the database for posts created by the user
    const userPosts = await Post.find({ userId });

    res.status(200).json({
      success: true,
      message: 'User posts retrieved successfully',
      posts: userPosts,
    });
  } catch (error) {
    console.error('Error retrieving user posts:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving user posts',
    });
  }
};

module.exports.authenticateToken = authenticateToken;