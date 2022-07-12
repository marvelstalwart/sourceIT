import React from 'react';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import {CardActionArea} from '@mui/material';

export default function SingleAdvert(offer) {
    let navigate = useNavigate()
    return (
       
             <div className='company-offer'>
                 
                        <div className='advert-box'>
                        <CardActionArea sx={{height: 100}} onClick={()=> {

                            navigate(`/offers/${offer.id}`, {
                                state: {offer}
                            })
                        }}>
                         
                        <div className='advert-box-items'>
                     <Avatar className="avatar2" sx={{ bgcolor: offer.color }}
                    alt="Remy Sharp"
                    src={offer.profilePic} >
               
                    </Avatar>
                   
                    <div className='advert-box-text'>
                    <h3> {offer.name} </h3>
                    <p>
                            {offer.title}
                        </p>
                        </div>
                       
                    </div>
                    </CardActionArea> 
                        </div>
                       
                     
                    </div>
  
    )
}
