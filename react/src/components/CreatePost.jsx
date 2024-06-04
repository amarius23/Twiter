import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';

const CreatePost = ({ onPost }) => {
  const [postContent, setPostContent] = useState('');

  const handlePost = async () => {
    if (postContent.trim()) {
      try {
        // Send POST request to the backend
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/api/posts/create', {
          content: postContent
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
        
        if (response.status === 200) {
          console.log('Post created successfully:', response.data);
          onPost(postContent);
          setPostContent('');
        } else {
          console.error('Failed to create post:', response);
        }
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  return (
    <div className="create-post">
      <textarea
        className="post-input"
        placeholder="What's happening?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <button className="post-button" onClick={handlePost}>
        Tweet
      </button>
    </div>
  );
};

export default CreatePost;
