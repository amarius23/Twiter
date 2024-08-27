import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import './PostList.css';
import { PostContext } from '../contexts/PostContext';

const PostList = () => {
  const posts = useContext(PostContext);
  // const handleDelete = async (postId) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     await axios.delete(`http://localhost:3000/api/posts/delete/${postId}`, 
  //       {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });
  //     setPosts(posts.filter(post => post._id !== postId));
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //   }
  // };

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostCard key={post._id} post={post} /**onDelete={handleDelete}*/ />
      ))}
    </div>
  );
};

export default PostList;
