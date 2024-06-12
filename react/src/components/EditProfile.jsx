import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';

export default function EditProfile({ user, token }) {
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = useState(user.username);
  const [bio, setBio] = useState(user.bio || '');
  const [location, setLocation] = useState(user.location || '');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setUserName(user.username);
    setBio(user.bio);
    setLocation(user.location);
    console.log(location);
  }, [user]);

  const handleSave = async () => {
    try {
      // Send PUT request to the backend
      const response = await axios.put('http://localhost:3000/api/profile/updateProfile', 
        { username: userName, bio, location },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        console.log('Profile updated successfully:', response.data);
      } else {
        console.error('Failed to update profile:', response);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    handleClose();
  };


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    boxShadow: 24,
    borderRadius: '8px',
    p: 4,
    textAlign: 'center',
    position: 'relative',
  };

  const closeButtonStyle = {
    position: 'absolute',
    right: '16px',
    top: '16px',
    color: '#666',
  };

  const saveButtonStyle = {
    position: 'absolute',
    left: '16px',
    top: '16px',
    bgcolor: '#1976d2',
    color: '#fff',
    '&:hover': {
      bgcolor: '#1565c0',
    },
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Button onClick={handleClose} sx={closeButtonStyle}>X</Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Profile
          </Typography>
          <TextField
            id="username"
            label="Username"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            id="bio"
            label="Bio"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <TextField
            id="location"
            label="Location"
            fullWidth
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button sx={saveButtonStyle} onClick={handleSave}>Save</Button>
        </Box>
      </Modal>
      <button className="edit-profile-button" onClick={handleOpen}>Edit Profile</button>
    </div>
  );
}
