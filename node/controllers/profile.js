const User = require('../models/user');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage engine using multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('profilePicture');

// Function to determine content type based on file extension
const getContentType = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const contentTypeMap = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.bmp': 'image/bmp'
    };
    return contentTypeMap[ext] || 'application/octet-stream';
};

const uploadProfilePicture = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error uploading file' });
        }

        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Assuming you have a directory named 'uploads' to store uploaded images
            const imagePath = req.file.path;

            user.profilePicture = imagePath;

            await user.save();

            res.json({ success: true, profilePictureUrl: `/api/profile/getProfilePicture/${user.id}` });
        } catch (error) {
            console.error('Error updating profile picture:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    });
};

const getProfilePicture = async (req, res) => {
  try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user || !user.profilePicture) {
          return res.status(404).json({ success: false, message: 'User or profile picture not found' });
      }

      // Read the image file
      fs.readFile(user.profilePicture, (err, data) => {
          if (err) {
              console.error('Error reading image file:', err);
              return res.status(500).json({ success: false, message: 'Server error' });
          }

          // Convert the image data to base64 encoding
          const base64Image = Buffer.from(data).toString('base64');
          const ext = path.extname(user.profilePicture).toLowerCase();
          const contentTypeMap = {
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.gif': 'image/gif',
              '.bmp': 'image/bmp'
          };
          const contentType = contentTypeMap[ext] || 'application/octet-stream';

          res.json({ success: true, profilePicture: { data: base64Image, contentType } });
      });
  } catch (error) {
      console.error('Error fetching profile picture:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
    uploadProfilePicture,
    getProfilePicture
};
