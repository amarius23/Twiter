import React, { useState } from 'react';
import './PostCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare, faHeart } from '@fortawesome/free-solid-svg-icons';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import * as GLOBAL from '../constants';
import { useAuth } from './AuthContext';
import {Post} from '../types/Post';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = (post) => {
  
  const {user, id, token} = useAuth();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const postComment = async() => {
    const response = await axios.post(GLOBAL.API_URL+'/posts/'+post.post._id+'/comment',  
      {
        postId: post.post._id,
        comment: comment
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    
    handleClose();
  };
  
  return (
    <div className="post-card">
      <div className="post-card-header">
        <span className="post-card-username">@{user.username}</span>
        <span className="post-card-time">{new Date(post.post.createdAt).toLocaleString()}</span>
      </div>
      <div className="post-card-content">{post.post.content}</div>
      <div className="post-card-footer">
        <div className="post-card-stats">
          <span className="post-card-likes">
            <FontAwesomeIcon icon={faHeart} /> {post.post.likes}
          </span>
          <span className="post-card-comments" onClick={handleOpen}>
            <FontAwesomeIcon icon={faComment} /> {post.post.comments.length}
          </span>
          <span className="post-card-shares">
            <FontAwesomeIcon icon={faShare} /> {post.post.shares}
          </span>
        </div>
        <button className="post-card-delete-button" /**onClick={() => onDelete(post._id)}*/>
          Delete
        </button>
      </div>

      {/* Modal for Comments */}
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
       <DialogTitle sx={{ m: 0, p: 7, minWidth: 400}} id="customized-dialog-title">
       <span className="post-card-username">@{user.username}</span>
       <br></br>
          {post.post.content}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <input 
          type='text' 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Post your comment..'  
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={postComment}>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostCard;
