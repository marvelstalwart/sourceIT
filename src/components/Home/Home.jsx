import "./Home.css"

import HashLoader from "react-spinners/HashLoader"
import ReactCard from "./card/ReactCardContainer";
import BoxContainer from "./PostBoxes/BoxContainer";
import Overview from "./Pages/Overview";
import Footer from "./PostBoxes/Footer";
import HomeIcon from '@mui/icons-material/Home';
import Post from "./Pages/Post";
import { useAuth } from '../../firebase';  
import { db } from '../../firebase';
import { useState, useEffect } from 'react';

import { onSnapshot, collection, getDocs,
    where, orderBy,
    doc, refEqual, query, QueryConstraint, getDoc, collectionGroup } from 'firebase/firestore';

const Home = ({posts}) => {

    const [loading, setLoading] = useState(true);
const currentUser = useAuth();
const [reviews, setReviews] = useState([]);
const postCollectionRef = collection(db, "posts")
const ref = collection (db, 'users')
const studentRef = query (ref, where("type", "==", "Individual"))
const [students, setStudents] = useState ();
const [commentCount, setCommentCount] =useState([]);
const offersRef = collection(db, "vacancies")
const [offers, setOffers] = useState([])

    useEffect(() => {

        getAllPosts()
        getOffers();
        getStudentList();

},[])

const getAllPosts =  async () => {

    const data  = await getDocs (postCollectionRef);
    
    setReviews(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    return data
    }

const getOffers = async () => {
 
    const data = await getDocs(offersRef);

    setOffers(data.docs.map((doc) =>({...doc.data(),  id:doc.id})))
    setLoading(false)    
    return data
  }
   const getStudentList  = async () => {

    const data = await getDocs(studentRef)
    
    setStudents(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))

   }

return (
    loading? 
    <div className="loading">
        <HashLoader/>
    </div>
    :

    <div className='homeContainer'>
    <div className="featured"><h1>Featured Companies</h1></div>
    
       {/* <Overview/> */}
       <ReactCard/> 
      
       <BoxContainer posts={posts} students={students} reviews={reviews} offers={offers}/>
       
       

    </div>
)
}

export default Home;