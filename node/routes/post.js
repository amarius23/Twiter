const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const { authenticateToken } = require('../middlewares/authentication');

router.post('/create', authenticateToken, postController.createPost);
router.put('/posts/:postId', authenticateToken, postController.updatePost);
router.delete('/delete/:postId', authenticateToken, postController.deletePost);
router.get('/user', authenticateToken, postController.getUserPosts);
router.post('/:postId/comment', authenticateToken, postController.postComment);

module.exports = router;
