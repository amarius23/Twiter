const express = require('express');
const router = express.Router();
const { authenticateToken} = require('../middlewares/authentication');
const { uploadProfilePicture, getProfilePicture, updateProfile} = require('../controllers/profile.js');
router.post('/uploadProfilePicture', authenticateToken, uploadProfilePicture);
router.get('/getProfilePicture/:userId', authenticateToken, getProfilePicture);
router.put('/updateProfile',authenticateToken, updateProfile);

module.exports = router;
