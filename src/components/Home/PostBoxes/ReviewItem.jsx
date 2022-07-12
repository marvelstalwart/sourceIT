 import "./ReviewItem.css";
import { Avatar } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CommentIcon from '@mui/icons-material/Comment';
import {CardActionArea, Rating} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { MdReviews } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ReviewItem(reviews, key) {

    let navigate= useNavigate();
  return (
    <div className='review-box'>
    
               
        <div className="review-container">
            <div className="review-sub-container">
           
        <CardActionArea  onClick={() => {
            navigate(`/post/${reviews.id}`, {
                
                state:{ reviews
                }
            
            }
            );
        }}>
        <div className="review-content">
        <div className="review-content-header">  <Avatar src={reviews.cover} className="avatar" variant="square" /></div>
            
          
        
            <div className="review-side-content">
            <div className="review-author">
             <h4>{reviews.businessname}</h4>   
            
           <div className="star">  <StarOutlineIcon/> <h4>4.5</h4></div>   
            </div>
            <div className="review-content-title">
            <strong><h3>{reviews.title}</h3></strong>
            </div>
           
            
            </div>

            </div>
            </CardActionArea>
            
        
        </div>
        </div>
       
        </div>

  )
}
