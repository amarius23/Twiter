const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const { authenticateToken } = require('../controllers/post');

router.post('/create', authenticateToken, postController.createPost);
router.put('/posts/:postId', authenticateToken, postController.updatePost);
router.delete('/delete/:postId', authenticateToken, postController.deletePost);
router.get('/user', authenticateToken, postController.getUserPosts);

module.exports = router;
