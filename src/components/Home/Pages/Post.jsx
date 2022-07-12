import { Avatar , Alert, AlertTitle} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import "./Post.css";
import ReviewsIcon from '@mui/icons-material/Reviews';
import HashLoader from "react-spinners/HashLoader"
import {Button, Rating} from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import Deloitte from "../../../assets/img/Deloitte.jpg";
import SingleComment from "./comments/SingleComment";
import { useEffect, useState } from 'react';
import { db, useAuth, isAuth } from '../../../firebase';
import { LoadingButton } from '@mui/lab';

import {css} from "@emotion/react"
import {getDocs, getDoc, collection, addDoc, onSnapshot, setDoc, doc, updateDoc, arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore';
import { Router } from 'react-router-dom';
export default function Post({state, posts}) {


    const currentUser = useAuth();
  
    const location = useLocation();
   let navigate = useNavigate();
    const subCollectionRef = collection(db, `posts/${location.state.reviews.id}/comments`)
    const [awaitingData, setAwaitingData] = useState(true);
    const [loading, setLoading] = useState(false);
    const [commentBox, setCommentBox] = useState(false);
    const [ratingIcons, setRatingIcons] = useState(true);
    const [ratings, setRatings] = useState("");
    const [comment, setComment] = useState("");
    const [post, setPost] =useState([]);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState();
    const [companyName, setCompanyName] = useState("");
//   const commentos = [


//         {author: "David", comment: "Ei duo falli tritani euismod, verterem eloquentiam mei in.  Ius cu etiam iriure, duo mollis referrentur ex, ad nulla quando qui.Aliquam laoreet id vim, ex utinam delicata mea, eam meis apeirian in.  Magna consulatu qui ex, cu nullam instructior consectetuer eum. Sed  summo vivendum facilisi ea."
//         },
//        {author: "Joshua", comment: "Ei duo falli tritani euismod, verterem eloquentiam mei in.  Ius cu etiam iriure, duo mollis referrentur ex, ad nulla quando qui.Aliquam laoreet id vim, ex utinam delicata mea, eam meis apeirian in.  Magna consulatu qui ex, cu nullam instructior consectetuer eum. Sed  summo vivendum facilisi ea."
//         }
    
//     ];



    useEffect(() => {
        if (comment || comments) {

            getComments();
            getRatings();
            getPost()
            if (post && post.id) {
                getCompany()
            }
           
        }
       
       
         
    }, [averageRating, post.id, comment])
    


    const getPost = () => {

        const postCollectionRef = doc(db,"posts", `${location.state.reviews.id}`);
    const unsub = onSnapshot(postCollectionRef, (doc)=> {
        
        // const source= doc.metadata.hasPendingWrites ? "Local": "Server";
    
       setPost({...doc.data(), id: doc.id})

       unsub();
        
        setAwaitingData(false)



 
    
    })}

    const getCompany = () => {
        console.log("id",post.category)
        const companyRef = doc(db, "users", `${post?.category}`)
       
        const unsub = onSnapshot(companyRef, (doc)=> {
        
            const source= doc.metadata.hasPendingWrites ? "Local": "Server";
        
         setCompanyName(doc.data().businessname)
    
           unsub();
            
            setAwaitingData(false)
    
    
    
     
        
        })
    
    
    
     
        
         
    }
    const getComments = async () => {
    
    const commentData  = await getDocs (subCollectionRef);
    setComments(commentData.docs.map((doc) => ({...doc.data(), id: doc.id})))
    return getRatings()
   
}

    const getRatings = () => {
         let sum = 0;

        comments && comments.map((comment, index) => {

           sum+= comment.ratings
        }
        )
        const avg = sum/(comments.length);
        setAverageRating(avg)
       
        
        
    }
    // display comment box
const commentHandler = () => {
setCommentBox (true)
console.log(commentBox)

}

// setComment into the state
const handleChange =(e) => {

    setComment(e.target.value);


}

    

// Add new comment
const handleClick = async (e) => {


    try {
        setLoading(true);
    const payload = { 
            photoURL: currentUser?.photoURL,
           authorName: currentUser?.displayName,
            authorId: currentUser?.uid,
            content: comment,
            category: location.state.reviews.category,
            ratings: ratings
          
    }

  await addDoc(subCollectionRef, payload);
  setComment("");
  setLoading(false);
    console.log("success");
    return getComments();
}
catch {
    setLoading(false);
    console.log(" Unable to add comment", `${currentUser?.photoURL}`, `${currentUser?.displayName}`,
    `${currentUser?.uid}`,
comment,
    ratings)

}


}

  return ( 
    awaitingData? 
  

        <div className='loading'>
            
            <HashLoader loading={true} />
        </div>

  
    

    :
    
    <div className="post-section">
    <div className="post-container">
    <div className="post-content">
        <h2>{post.title}</h2>
        <div className="author-area">
         <Avatar/>
         <div className="author-description">
         <h4>Marvel</h4>
         <div className="company-area">
         <p className='company-profile' onClick={()=> {navigate(`/profile/${post.category}`)}}>IN: {companyName}</p>
       
         </div>
         
         </div>
         
        </div>
        <div className="separator"></div>
        
 
            <div className='img-cover-container'>
            <img src={post.cover}
            alt="Deloitte"
            />
                </div>
                
           <div className="post-content">
 
           
       <div dangerouslySetInnerHTML={{__html: post.content}}/>
       {/* {
 
           comment !== null && 
           comment.map((comment)=> {
 
             <div className="div" k></div>
 
           })
       } */}
       </div>
         </div>
    <div className="post-icons">
                 {
                    averageRating ?

                    <p>{averageRating.toFixed(1)}</p>
                    : 
                    <p>0</p>
                 }
                 
                 <Rating 
                 size="small"
 
                 defaultValue={2}
                 max={1}
                 readOnly />
 
                
             
   
             <ReviewsIcon className='review-icon'/>
             <p>{comments.length}</p>
             </div>
    </div>
 
 
    
        { ratingIcons  && currentUser?.displayName?
         <div className="leave-comment">
             <div className="rating">
             <div className='rating-items'>
             <p> Leave a Rating</p>
 
         <Rating 
         size='large'
         value={ratings}
         onChange={(event, newValue) => {
             setCommentBox(true);
             setRatingIcons(false);
             setRatings(newValue);
             console.log(commentBox, ratings)
 
         }}
         /> 
          </div>  
        </div>
        </div>
        : 
        !currentUser?.displayName &&
        <div className="read-ony">
            <Alert severity="warning">
             <AlertTitle>You are on read only mode</AlertTitle>
             
             {
                 currentUser?
                <p> Set up your profile to make interactions</p>
                 :
                 <p>Sign up to make interactions</p>

             }
           
             
             </Alert>
        </div>
       } 
        
     {commentBox && 
     
     <div className="leave-comment">
 
 
     <div className="text-area">
    
                 
         <textarea onChange={handleChange}  value={comment} placeholder="Tell us how you feel (required)" typeof="text">
 
 
         </textarea>
         <div className="button">
         <LoadingButton   loading={loading} variant="contained" className='review-button' onClick={handleClick}>Review</LoadingButton>
                     
         </div>
                     
         </div>
         </div>    
 
     }
   
 
     
  <>
 
 {comments && comments.authorId && console.log(comments)}
 <div className="comments-container">
 {comments && comments.map((comment, index) => {
 
     return (
 
     <SingleComment {...comment} key={index} currentUser={currentUser}/>
     )
 })}
  </div>
    </>
    </div>
  
  )
}
