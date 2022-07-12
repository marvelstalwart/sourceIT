import React from 'react'
import { Avatar } from '@mui/material';
import { useNavigate, useLocation} from 'react-router-dom';

export default function OfferPage() {
    let navigate=useNavigate()
    let location = useLocation()
  return (
    <div className="post-container">
    <div className="post-content">
       
        <div className="author-area">
         <Avatar src={location.state.offer.profilePic}/>
         <div className="author-description">
         <h2>{location.state.offer.title}</h2>
         <div className="company-area">
         <p className='company-profile' onClick={()=> {navigate(`/profile/${location.state.offer.authorId}`)}}>
             {location.state.offer.name}
         </p>
       
         </div>
         
         </div>
         
        </div>
        <div className="separator"></div>
        
 
           
                
           <div className="post-content">
 
           
       <div dangerouslySetInnerHTML={{__html: location.state.offer.content}}/>


        <div className="apply-offer"><p>Do you meet the requirements? Send an Email to {location.state.offer.email}</p></div>
       {/* {
 
           comment !== null && 
           comment.map((comment)=> {
 
             <div className="div" k></div>
 
           })
       } */}
       </div>
         </div>
    </div>
 
 
  )
}
