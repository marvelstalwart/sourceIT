import './Profile.css'
import { useAuth } from '../../../../firebase'
import { Rating,Button, Grid , Divider  } from '@mui/material';
import emailjs from '@emailjs/browser';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PersonIcon from '@mui/icons-material/Person';
import RecommendIcon from '@mui/icons-material/Recommend';
import { onSnapshot, collection, getDocs,
  where, orderBy,
  doc, refEqual,collectionGroup, query, QueryConstraint, getDoc } from 'firebase/firestore';
  import ReplyIcon from '@mui/icons-material/Reply';
  import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
  import HashLoader from "react-spinners/HashLoader"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../../firebase';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useEffect, useState, useRef } from 'react';
import TestCard from '../../card/TestCard';
import SingleBox from '../../PostBoxes/SingleBox';
import {Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Avatar, Card } from '@mui/material';
import RecommendModal from './RecommendModal';
import WarningIcon from '@mui/icons-material/Warning';
import UpdateIcon from '@mui/icons-material/Update';
import SingleComment from '../comments/SingleComment';


export default function Profile() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] =useState([]);
    const currentUser = useAuth();
    const [commentRef, setCommentss] = useState([]);
    const [comments, setComments] = useState([]);
    const [postLists, setPostList] =useState([]);
    const postCollectionRef= collection(db, "posts");
    const userCollectionRef = (db, "users");
    const [studentsList, setStudentsList] = useState([]);
    const [visitingUser, setVisitingUser] = useState();
    const [visitingSchool, setVisitingSchool] = useState();
   const [state, setState] = useState([])
   const [studentState, setStudentState]=  useState([]);
   const form = useRef();   
    const [checkState, setCheckState] = useState(false); 
    const [checked, setChecked] = useState(false)    
    const specificPosts = query(postCollectionRef, where ("category", "==", `${params.id}`))
    const commentGroupRef = query(collectionGroup(db, "comments"), where ('authorId', '==', `${params.id}`))
  const [open, setOpen] = useState(false)
  const [studentsChecked, setStudentsChecked] = useState();
  const [selectedStudents, setSelectedStudents] = useState([])
  const [error, setError] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [data, setData] = useState({})
  const [sent, setSent]= useState(false)
  const [companyName, setCompanyName] = useState("")
  const [sendingMail, setSendingMail] =useState(false)
  const handleOpen = () => {


    setOpen(true);

    getStudents();

   
  

  }

  useEffect(()=> {
    if (studentState ) {
      setSelectedStudents(studentState.filter(student => student?.isChecked === true))
      console.log(selectedStudents)

  

      // setData(selectedStudents.map((select) => 
      
      // ({...select, phone: select.phone, firstname: select.firstname} )
      
      // ))
      // console.log("New data", data)
      if (selectedStudents && selectedStudents.length > 3) {
        setError(true)
        setDisabled(true)
      }
      else {
        setError(false)
        setDisabled(false)
      }
    }
     

  }, [studentState ,selectedStudents.length])

  const sendEmail = (e) => {
    setSendingMail(true)
    e.preventDefault();
    selectedStudents.map ((student) => {
   
        
       
        emailjs.send('service_3w6fl7v', 'template_znfyuab', {
          companyname: profile.businessname,
          firstname: student.firstname,
          middlename: student.middlename,
          lastname: student.lastname,
          email: student.email,
          phone: student.phone,
          school: data.school
        }
      , 'l7SQHxDGswI7R-vSI').then(() => {
       
        console.log(sendingMail)
        setSent(true)

    }, () => {
      
    });

    
       

    })
    
  };

  const checkHandler = (event, student) => {
//  const {name, checked} = event.target;
setStudentState(studentState.map((student)=> 
student.id === event.target.name ? 
{...student, isChecked: event.target.checked}
: student
 ))


 
 console.log(studentState)
 
 
  //   setStudentsChecked({...studentsChecked, name: event.target.name, isChecked: event.target.checked})
  // console.log(studentsChecked)
//   // console.log(studentsChecked)
// if (checked === true) {


// }
//   setChecked(!checked);

  
}

const handleSubmit = () => {

 

  console.log("hello", selectedStudents.length)

}
 
  const handleClose = () => setOpen(false);

    
    let navigate = useNavigate();
    // const organisationList = query(userCollectionRef, where ("organization", "==", true))
   
    // const hey = postCollectionRef.orderByChild.equalTo("Eridan");
    // console.log(hey);
  
    console.log(currentUser?.uid, params.id)
    useEffect(()=> {

      if (params.id)  {
    
      getData()
      getPosts()
      getComments();
     
      if (profile.type === "School") {

        getStudents();
     
      }

      if ( currentUser && currentUser.uid !== params.id) {
        getVisitingUser();
      }
      
     }
    

    }, [currentUser, profile.businessname, profile.schoolname,params.id ]);
      

   
  
            
  const getComments= async () => {

    
    const data = await getDocs(commentGroupRef);

    setComments(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
    const companyRef = doc(db, "users", `${comments?.category}`)
    const unsub = onSnapshot(companyRef, (doc)=> {
      
         
      
      setCompanyName(doc.data().businessname)
 
        unsub();
         
    })}
      // data.docs.map((post) => {

      //     const commennt = doc(db, "posts", `${post.id}`, "comments", "gyiRZ3N2X5JPgz6vkd6j")

      //     setCommentss(commennt)
      // })


    // setComments (data.docs.map((post) =>( {

    //   doc(db, "posts", post.id,  )

    // })
    
    // ))    
    
    
    

  const getVisitingUser = () => {

    const docRef = doc(db, "users", `${currentUser?.uid}`)
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setVisitingUser(doc.data().type);
      setVisitingSchool(doc.data().schoolname)
      unsubscribe();
      setData({school: visitingSchool}) 
      console.log("Data is: ", data)
    })
  }

    const getData =() => {
      const docRef = doc(db, "users", `${params.id}`);
      
      const unsub = onSnapshot(docRef, (doc)=> {
        
        // const source= doc.metadata.hasPendingWrites ? "Local": "Server";
    
       setProfile({...doc.data(), id: doc.id})

       unsub();
        
       setLoading(false)
   });
     
   };

   const getStudents = async () => {

      const usersRef = collection(db, "users");
      // console.log(`${profile?.schoolname}`)
      if (profile.schoolname ) {

        const studentsRef = query(usersRef, where("school", "==", `${profile?.schoolname}`));
        const data =  await getDocs(studentsRef);
      setStudentsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      }
      else if (visitingSchool) {
        const studentsRef = query(usersRef, where("school", "==", `${visitingSchool}`));
        const data =  await getDocs(studentsRef);
        setStudentsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
         setStudentState(data.docs.map((doc) =>({...doc.data, id: doc.data().firstname + doc.data().lastname, firstname: doc.data().firstname , lastname: doc.data().lastname,
        middlename: doc.data().middlename, email:doc.data().email, phone:doc.data().phone  }))) 
        console.log(studentState)
        console.log(studentsList)
         //  setState(data.docs.map((doc) =>("false")))

        //  if (studentState) {
        //   // let obj =  Object.assign.apply({}, studentState.map( (v, i) => ( {v: state[i]} ) ) );
        //   // setStudentsChecked(obj);
          
        //   console.log(studentsChecked)
        //  }
        
         

      }
    }

   const getPosts = async () => {
    
    const data = await getDocs (specificPosts);
  
    setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
   
  }

        
  return (

    
      loading? 
    <div className="loading">
      <HashLoader/>
      </div>
      :

    
    <Container >



    <div className="profile-container">

  

    

        <div className="avatar-container">

        <div className="avatar">
        <Avatar className="icon" src={profile.profilePic} sx={{width: 100, height:100 }}/>
        </div>

      
        
        <div className="profile">

          {
          profile  && profile.type==="Organization"?
        <div>
            <div className="business-details">
              <div className="business-text-details">
                <div className="name-location">


                <h1>{profile.businessname}</h1>
                <div className="location"><LocationOnIcon/><p>{profile.location}</p></div>
                  
                </div>
               
                  <div className="text-details">
                    
                  <div className="single-text">
                    <p>Ratings</p>
                    <div className="rating"><h5>4</h5> <Rating 
                size="small"
                defaultValue={4}

                readOnly />
                </div>
                   
                </div>
                {/* <div className="single-text">
                  <h2>0</h2>
                  <p>Applicants</p>
                </div> */}
                </div>
                <div className="headers">
                  {/* <div className="company-overview"><RemoveRedEyeIcon sx={{maxHeight: "15px"}}/><h4>Overview</h4></div> */}
                  <div className="details"><PersonIcon sx={{maxHeight: "15px"}} color="inherit"/> <h4>0  Ongoing Offers</h4></div>
                 <div className="details" onClick={()=> {navigate("/create-vacancy")}}><DriveFileRenameOutlineIcon sx={{maxHeight: "15px"}} color="inherit"/> <h4> Create New Offer</h4>
                 </div> 
                 
                 {
                   visitingUser && visitingUser === "School" ?
                   <>
                   <div className="recommend" sendEmail={sendEmail} onClick={handleOpen}><RecommendIcon sx={{maxHeight: "15px"}} color="inherit"/><h4>Recommend Students</h4></div>
                    <RecommendModal sendingMail={sendingMail} sent={sent} sendEmail={sendEmail} disabled={disabled} handleSubmit={handleSubmit} form={form} error={error} studentsChecked={studentsChecked} setStudentState={setStudentState} studentState={studentState} checkState={checkState} checkHandler={checkHandler} open={open} handleClose={handleClose} students={studentsList}/>
                    </>
                   :

                   visitingUser && visitingUser === "Individual" &&
                   <div className="apply"><DoneAllIcon sx={{maxHeight: "15px"}} color="inherit"/><h4>Apply</h4></div>

                 }
                 
                 
                </div>

              <Divider ></Divider>
              <div className="overview-text">
              <p className='overview'>
                
                {profile.overview}
                
                
                
                </p>
              </div>

          
              <div className="list-details">

               <Grid className='grid' container xs={12}>

                <Grid item >

                 <div className="contact-container">
                <div className="contact-info">
                <h6>CONTACT INFORMATION</h6>
              

              </div>
                
              <div className="contact-grid">

                  
              <Grid container>


              <Grid item xs={4}>
                <div className="list">
                <p>Address: </p>
              <p>Phone: </p>
              <p>E-mail: </p>
              <p>Website: </p>
                </div>

              </Grid>

              <Grid item xs={8}> 
              <div className="list">

              </div>
              <div className="list">
              <p>{profile.address}</p>

              </div>

              <div className="list">
              <p>{profile.phone}</p>
                  
              </div>

              <div className="list">
              <p>{profile.companyemail}</p>

              </div>

              <div className="list">
              <p>{profile.website}</p>

              </div>
              </Grid>

              </Grid>


                
              </div>
              
              </div>
            



                </Grid>


               
                </Grid>
              {/* <Grid container >

             
                <Grid item xs={12} >
++
              <h2> Open Offers </h2>
                

              </Grid>
              </Grid> */}

              </div>
              </div>
            

            </div>
            {
             
              (currentUser?.uid === params.id) &&
              
              <div className="button-container">
              <div className="link" onClick={ ()=> {
                            
                            navigate( "/update-profile",
                {
                  state: {
                    profile
                  }
                } 
                  );
                }}><ModeEditIcon/><h5>Edit Profile</h5></div> 
              </div>
            }
           
                
        </div>

         :

         profile && profile.type=== "Individual"? 
         
         <div className='details'>
            <div className="text-details">
            <div className="single-text">
            <h2>{comments.length}</h2>
            <p>Reviews</p>
              </div>
              <div className="single-text">
            <h2>0</h2>
            <p>Applications</p>
              </div>
            </div>
  
            <div className="main-text">
              <div className="main-text-items">
              <h1> {profile?.firstname + " " + profile.middlename+ " " + profile.lastname}, {profile.age}</h1>
             
             <div className="skills">

              <div className="skill-header">
              <h5>SKILLS</h5>
              <Divider/>
             
                </div> 
                <p>{profile.skills}</p>
             </div>

             <div className="description">

              <div className="description-header">
              <h5>DESCRIPTION</h5>
              <Divider/>
             
                </div> 
                <p>{profile.description}</p>
             </div>


              
              
              <div className="list-details">

               <Grid className='grid' container xs={12}>

                <Grid item >

                 <div className="contact-container">
                <div className="contact-info">
                <h6>ADDITIONAL INFORMATION</h6>
              

              </div>
                
              <div className="contact-grid">

                  
              <Grid container>


              <Grid item xs={4}>
                <div className="list">
                <p>Location: </p>
              <p>Phone: </p>
              <p>E-mail: </p>
              <p>School: </p>
                </div>

              </Grid>

              <Grid item xs={8}> 
              <div className="list">

              </div>
              <div className="list">
              <p>{profile.location}</p>

              </div>

              <div className="list">
              <p>{profile.phone}</p>
                  
              </div>

              <div className="list">
              <p>{profile.email}</p>

              </div>

              <div className="list">
              <p>{profile.school}</p>

              </div>
              </Grid>

              </Grid>


                
              </div>
              
              </div>
            



                </Grid>


               
                </Grid>
              {/* <Grid container >

             
                <Grid item xs={12} >

              <h2> Open Offers </h2>
                

              </Grid>
              </Grid> */}

              </div>
                
  
  
  
                </div>
  
              
              
              </div>
              {
             
             (currentUser?.uid === params.id) &&
             
             <div className="button-container">
             <div className="link" onClick={ ()=> {
                           
                           navigate( "/update-profile",
               {
                 state: {
                   profile
                 }
               } 
                 );
               }}><ModeEditIcon/><h5>Edit Profile</h5></div> 
             </div>
           }
            </div>

          : profile && profile.type==="School" ?

          <div className="div">

    <div className="business-details">
              <div className="business-text-details">
                <div className="name-location">


                <h1>{profile.schoolname}</h1>
                <div className="location"><LocationOnIcon/><p>{profile.location}</p></div>
                  
                </div>
               
                  <div className="text-details">
                    
                 
                {/* <div className="single-text">
                  <h2>0</h2>
                  <p>Applicants</p>
                </div> */}
                </div>
                {/* <div className="headers">
                  <div className="company-overview"><RemoveRedEyeIcon sx={{maxHeight: "15px"}}/><h4>Overview</h4></div> 
                  <div className="details"><PersonIcon sx={{maxHeight: "15px"}} color="inherit"/><h4>{studentsList.length} registered students</h4></div>
                 
                </div>

              <Divider ></Divider> */}
              <div className="overview-text">
              <p className='overview'>
                
                {profile.description}
                
                
                
                </p>
              </div>

          
              <div className="list-details">

               <Grid className='grid' container xs={12}>

                <Grid item >

                 <div className="contact-container">
                <div className="contact-info">
                <h6>CONTACT INFORMATION</h6>
              

              </div>
                
              <div className="contact-grid">

                  
              <Grid container>


              <Grid item xs={4}>
                <div className="list">
                <p>Address: </p>
              <p>Phone: </p>
              <p>E-mail: </p>
              <p>Website: </p>
                </div>

              </Grid>

              <Grid item xs={8}> 
              <div className="list">

              </div>
              <div className="list">
              <p>{profile.address}</p>

              </div>

              <div className="list">
              <p>{profile.phone}</p>
                  
              </div>

              <div className="list">
              <p>{profile.email}</p>

              </div>

              <div className="list">
              <p>{profile.website}</p>

              </div>
              </Grid>

              </Grid>


                
              </div>
              
              </div>
            



                </Grid>


               
                </Grid>
              {/* <Grid container >

             
                <Grid item xs={12} >
++
              <h2> Open Offers </h2>
                

              </Grid>
              </Grid> */}

              </div>
              </div>
            

            </div>
            

            {
             
             (currentUser?.uid === params.id) &&
             
             <div className="button-container">
             <div className="link" onClick={ ()=> {
                           
                           navigate( "/update-profile",
               {
                 state: {
                   profile
                 }
               } 
                 );
               }}><ModeEditIcon/><h5>Edit Profile</h5></div> 
             </div>
           }



          </div>



          :
            <>
          <div className="no-profile-container">
          <div className="no-profile"><div className="items"><div className="warning"><WarningIcon color='error' fontSize='large' /></div><h4>You are yet to setup your profile! </h4></div></div> 
         
          </div>
          <div className="button-container">
          <Link className="link" to={"/update-profile"}><ModeEditIcon/><h5>Set up your profile now</h5></Link> 
          </div>
          </>
          }
          
 
        
        
        </div>
        </div>

        </div> 


        <div className="profile-post-container">

        <div className="post-section">

          
            {
               profile  && profile.type==="Organization"?
             
             <>
                <h5> REVIEWS ABOUT {currentUser?.uid===params.id? 
               <div className="you">
                 &nbsp;YOU
               </div> 
              :
              <div className="company-name">
                &nbsp; {profile.businessname.toUpperCase()}
              </div>
              }</h5>

                <Divider/>
                {postLists.length === 0 ?
        
        <div className="no-posts">
          <p>Oops! Nothing Yet</p>
        </div>

        :

        <div className="review-con">
        
        {postLists.map((post, index) => {
          
          return <div className="singleBox-container">
            <SingleBox {...post} key={index} reviews={post} />
          </div>
          
     
          
         //  <div dangerouslySetInnerHTML={{ __html: post.content}}/>
       })}
       </div>
        }
       </>

       :
        profile && profile.type==="Individual" ?
        
        

        <>
              <h5> YOUR REVIEWS</h5>
          <Divider/>
        {
          comments.length === 0?
        <div className='no-posts'><p> You've not made any review yet</p></div>

        :
        comments.map((comment, index) => {

          return (
            <div className='single-comment-container'>
              <div className="comment-icon"><ReplyIcon/> <h4>{companyName}</h4></div>
            <SingleComment {...comment} key={index} currentUser={currentUser}/>
            </div>
            )

        })
        }
        </>

        :
        profile && profile.type==="School" &&
              <>
              <h5> LIST OF REGISTERED STUDENTS ({studentsList.length})</h5>
          <Divider/>
        {
          studentsList.length === 0?
        <div className='no-posts'><p> You currently do not have any student on the platform</p></div>

        :
        <div className="table">

<TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className='table-header'>
          <TableCell>NO</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Email&nbsp;</TableCell>
            <TableCell align="right">Location&nbsp;</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {studentsList.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="right">
                {row.lastname}
              </TableCell>
              <TableCell align="right">{row.firstname}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </div>
        }
        </>
     }
 

              
{/*                
              :
              
             
            }
        */}

        </div>
{/* 
        {
          comments.length === 0?
        <p>Omo til tomorrow</p>

        :
        comments.map((comment, index) => {

          return (

            <SingleComment {...comment} key={index} currentUser={currentUser}/>
            )

        })
        }
        
        {postLists.length === 0 ?
        
          <div className="no-posts">
            <p>Oops! Nothing Yet</p>
          </div>

          :

          <div className="review-con">
          {postLists.map((post, index) => {
            
            return <div className="singleBox-container">
              <SingleBox {...post} key={index} reviews={post} />
            </div>
            
       
            
           //  <div dangerouslySetInnerHTML={{ __html: post.content}}/>
         })
        }

</div>
         

      
      }
           */}
       
          </div>

        </Container>
  )
}
