import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/posts/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        // Assuming the response.data.posts contains an array of posts
        const fetchedPosts = response.data.posts.map(post => ({
            _id: post._id, // Override the ID here
            // Keep other properties the same
            ...post
        }));
        setPosts(fetchedPosts);
      } else {
        console.error('Error retrieving posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/posts/delete/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostCard key={post._id} post={post} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default PostList;
