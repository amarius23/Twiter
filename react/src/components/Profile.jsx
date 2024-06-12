import React, { useState, useEffect } from 'react';
import CreatePost from './CreatePost';
import PostList from './PostList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';

const token = localStorage.getItem('token');

const Profile = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || null);

  const handleNewPost = (postContent) => {
    setPosts([postContent, ...posts]);
  };

useEffect(() => {
  if (user && user.id) {
    axios.get(`http://localhost:3000/api/profile/getProfilePicture/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      const { profilePicture } = response.data;
      if (profilePicture && profilePicture.data) {
        const base64String = `data:${profilePicture.contentType};base64,${profilePicture.data.toString('base64')}`;
        setProfilePicture(base64String);
      }
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }
}, [user]);


  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
      uploadProfilePicture(file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadProfilePicture = (file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);

    axios.post('http://localhost:3000/api/profile/uploadProfilePicture', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      if (response.data.success) {
        // Update user data
        const updatedUser = { ...user, profilePicture: response.data.profilePictureUrl };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Profile picture updated successfully!');
      }
    }).catch(error => {
      console.error('Error updating profile picture:', error);
    });
  };

  return (
    <div className="container profile">
      <div className="profile-banner mb-4"></div>
      <div className="d-flex align-items-center justify-content-between profile-picture-container mb-4">
        {profilePicture ? (
          <img className="profile-picture" src={profilePicture} alt="Profile" />
        ) : (
          <div className="default-icon">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </div>
        )}
        <div className="profile-picture-overlay">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleProfilePictureChange} 
            className="profile-picture-input"
          />
          <FontAwesomeIcon icon={faCamera} className="camera-icon" />
        </div>
        <button id="editProfileButton" class="edit-profile-button">Edit Profile</button>
      </div>
      <div className="text-center profile-details">
        <h2 className="profile-name">{user.username}</h2>
        <p className="profile-email">{user.email}</p>
      </div>
      <div className="d-flex justify-content-around border-top border-bottom py-2 profile-tabs">
        <button className="btn btn-link tab-button">Tweets</button>
        <button className="btn btn-link tab-button">Tweets & Replies</button>
        <button className="btn btn-link tab-button">Media</button>
        <button className="btn btn-link tab-button">Likes</button>
      </div>
      <div className="profile-content mt-4">
        <CreatePost onPost={handleNewPost} />
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default Profile;
