import React, { useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import PostList from './PostList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';


const Profile = ({ user }) => {
  const [posts, setPosts] = useState([]);

  const handleNewPost = (postContent) => {
    setPosts([postContent, ...posts]);
  };
  console.log(user);
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-banner"></div>
        <div className="profile-picture-container">

        </div>
      </div>
      <div className="profile-details">
        <h2 className="profile-name">{user.username}</h2>
        <p className="profile-email">{user.email}</p>
      </div>
      <div className="profile-tabs">
        <button className="tab-button">Tweets</button>
        <button className="tab-button">Tweets & Replies</button>
        <button className="tab-button">Media</button>
        <button className="tab-button">Likes</button>
      </div>
      <div className="profile-content">
        <CreatePost onPost={handleNewPost} />
        <PostList/>
      </div>
    </div>
  );
};

export default Profile;
