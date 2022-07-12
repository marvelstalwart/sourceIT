import { Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import {Button} from "@mui/material";
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function SingleComment(comments, currentUser) {
  let navigate = useNavigate();
  const viewProfile = () => {
    navigate(`/profile/${comments.authorId}`);

  }
  
  
  return (
    
   <div className="comment-container">

   <div className="single-comment">
       <div className="comment-author" onClick={viewProfile}>
       <Avatar src={comments.photoURL}/>  <h4>{comments.authorName}</h4>

       </div>
       <div className="comment-box">
       <p>
       {comments.content}

       </p>
      
       </div>
       <div className="comment-icons">
          
        <Rating 
        size='small'
        value={comments.ratings}
       readOnly
        /> 
           
       </div>
   </div>

  </div>
  )
}
