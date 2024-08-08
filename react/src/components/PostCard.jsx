import React from 'react';
import './PostCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare, faHeart } from '@fortawesome/free-solid-svg-icons';

const PostCard = ({ post, onDelete }) => {
  return (
    <div className="post-card">
      <div className="post-card-header">
        <span className="post-card-username">@{post.userId.username}</span>
        <span className="post-card-time">{new Date(post.createdAt).toLocaleString()}</span>
      </div>
      <div className="post-card-content">{post.content}</div>
      <div className="post-card-footer">
        <div className="post-card-stats">
          <span className="post-card-likes">
            <FontAwesomeIcon icon={faHeart} /> {post.likes}
          </span>
          <span className="post-card-comments">
            <FontAwesomeIcon icon={faComment} /> {post.comments.length}
          </span>
          <span className="post-card-shares">
            <FontAwesomeIcon icon={faShare} /> {post.shares}
          </span>
        </div>
        <button className="post-card-delete-button" onClick={() => onDelete(post._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;
