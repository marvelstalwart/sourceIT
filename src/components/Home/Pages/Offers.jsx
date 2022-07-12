import React, { useEffect, useState } from 'react'
import "./Offers.css"
import { Avatar } from '@mui/material'
import { onSnapshot, collection, getDocs,
  where, orderBy,
  doc, refEqual, query, QueryConstraint, getDoc, collectionGroup } from 'firebase/firestore';
import { db } from '../../../firebase';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CardActionArea } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../firebase';
export default function Offers() {
  const currentUser = useAuth();
  let navigate= useNavigate();
  const offersRef = collection(db, "vacancies")
  const [offers, setOffers] = useState([]);
  const [filter, setFilter] =useState("All");

  useEffect(()=> {
    if (filter==="All") {
      getOffers()
      console.log(offers)

    }
    else if (filter ==="MyOffer") {

      setOffers(offers.filter(offer => offer.authorId === `${currentUser?.uid}`))


    }

 
  },[filter])   
  const getOffers = async () => {
 
    const data = await getDocs(offersRef);

    setOffers(data.docs.map((doc) =>({...doc.data(),  id:doc.id})))
    

  }


  return (
    <div className='offers-main-container'>
       <div className="recent-offers"> <h1>Recent Internship Offers
        </h1>
        <div className="line"><hr/></div>
        </div>
        <div className="offers-container">
         <div className="offers-sub-container">
          <div className="filter"><FilterListIcon/><div className="all" onClick={()=> {setFilter("All")}}><h2>All</h2></div><div className="mine" onClick={()=> {setFilter("MyOffer")}}><h2>My Offers</h2></div></div>
          {offers.map((offer, index)=> {
               
               return <div className="offer" key={index}>
                   <CardActionArea 
                   onClick ={()=> {
                    navigate(`/offers/${offer.id}`, {
                      state: {
                        offer
                      }
                    })

                   }}
                   
                   height="inherit">
               <div className="offer-content">
                   <div className="offer-heading"><Avatar src={offer.profilePic}/>
                     <h3>{offer.title}</h3>
                     </div>
                     <div className="offer-items">
                     <div className="offer-name"><ApartmentIcon fontSize='12px'/><h5>{offer.name}</h5></div> 
                     <div className="offer-location"><LocationOnIcon fontSize='12px'/><h5>{offer.location}</h5></div>
                     </div>
               </div>
               </CardActionArea>  
                
             </div>
                 
          })}           
           </div>
                    </div>
    </div>
  )
}
