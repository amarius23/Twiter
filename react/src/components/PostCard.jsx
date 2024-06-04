import React from 'react';
import './PostCard.css';

const PostCard = ({ post, onDelete }) => {
  return (
    <div className="post-card">
      <div className="post-card-content">{post.content}</div>
      <button className="post-card-delete-button" onClick={() => onDelete(post._id)}>
        Delete
      </button>
    </div>
  );
};

export default PostCard;
