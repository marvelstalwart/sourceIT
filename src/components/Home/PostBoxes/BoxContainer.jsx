 import './BoxContainer.css';
import img1 from "../../../assets/img/construction.jpg"
import {Grid, Button, Pagination, Stack, CardActionArea, CardActions , Divider, List, AvatarGroup, Avatar} from '@mui/material';
import SingleBox from './SingleBox';
import ListIcon from '@mui/icons-material/List';
import { deepOrange } from '@mui/material/colors';
import SingleAdvert from './SingleAdvert';
import ReviewItem from './ReviewItem';
import Offers from '../Pages/Offers';
import contact from "../../../assets/img/contact.jpg"
import tut1 from "../../../assets/img/picone.png"
import tut2 from "../../../assets/img/pictwo.png"
import tut3 from "../../../assets/img/picthree.png"
import {LoadingButton} from "@mui/lab";

import { useState, useEffect } from 'react';

import {FormControl, InputLabel, FormControlLabel, InputBase, Switch, TextField, Radio, RadioGroup, Input } from "@mui/material";



const BoxContainer= ({reviews, students, posts, offers}) => {
   const initialValues = {
    fullname: "",
    email: ""}
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);
    const [fullnameError, setfullnameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    useEffect(()=> {
        
        if (Object.keys(formErrors).length === 0 && isSubmit) {



            console.log("Hello", formErrors)
         

        }
        if (Object.keys(formErrors).length > 0 && isSubmit) {

        
         console.log("Errors")

         }
        if (formValues.fullname && formValues.fullname.length < 6) {
            setFormErrors({...formErrors, fullname: "Too short"})
       
        }
        else if (!formValues.fullname && isSubmit) {
            setfullnameError(true)
            setFormErrors({...formErrors, fullname: "Name is required"})
      
        }
        else {
            setFormErrors({...formErrors, fullname: ""})
         
        }
         if (formErrors.fullname === "Too short") {
            setfullnameError(true)
        }

        if (formErrors.fullname===""){
            setfullnameError(false);  
            console.log(formValues, formErrors)
        }
        
        else if (formErrors.email) {
            setEmailError(true)
        }
        else if (!formErrors.email) {
            setEmailError(false)
            
        }

       

    }, [ formValues, formErrors.fullname, formErrors.length, formValues.email, formValues.fullname])

    const formValidation = (e) => {
        
        const {name, value} = e.target;
        
        setFormValues({...formValues, [name]: value});
        
    }

    const contactSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true)
   
    }


    const validate = (values) => {
        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!values.fullname) {
            errors.fullname = "Please write your full name";
            
        }
        else if (values.fullname.length < 6) {
            errors.fullname = "Name must be at least 6 characters"
        }
        
        if (!values.email) {
            errors.email = "Email is required";
            
        }
        else if (!regex.test(values.email)) {
            errors.email ="This is not a valid email format"
        }
       
        return errors;



    }
  

    return (
        <div className='flex-main-container'>
        <div className="flex-container">
            <div className="tutorial-container">
                <div className="how-it-works" id="how-it-works"><h5> HOW IT WORKS</h5></div>
            <div className="source-plan"><h3>The 3 steps to improve the three-tier relationship</h3></div>
            
           <div className="plan-1">
               <div className="plan-container">

               
           <div className="section-2">
                <div className="section-img">
                    <img src={tut1}/>
                </div>
               </div>

               <div className="section-1">
                    <h1> 01 </h1>
                    <h3>As a Student</h3>
                    <p>
                        Air your honest views on Companies/Organizations by rating and writing a concise review.
                        It educates others and provides the insights required to make informed decisions. Conversely, read reviews on companies and other 
                        students' opinions. Send an email if you think you are up to the task!
                    </p>
                    <div className="std-avatar">

                                    
                                        {students && students.length &&

                    <AvatarGroup className="student-avatar" max="5" total={students.length}>

                    {students.map((student, index) => {

                        return <Avatar   sx={{width: 30, height: 30}} key={index} alt={student.firstname} src={student.profilePic}/>

                        })}


                    </AvatarGroup>


                    }
                </div>
               </div>
               </div>
               </div> 
               <div className="plan-2">
                   <div className="plan2-container">


                  
               <div className="section-1">
               <div className="section-img">
                    <img src={tut2}/>
                </div>
               </div>
               <div className="section-2">
               <h1> 02 </h1>
                    <h3>As a School</h3>
                    <p>
                      Sit on the sidelines and watch your students get competitive. Step in and give them a boost by
                      recommending them for internship. You can only recommend three students per session. Oh! you can write reviews too.

                    </p>
               </div>
               </div>
               </div> 
               <div className="plan-3">
                   <div className="plan-container">
               <div className="section-2">
               <div className="section-img">
                    <img src={tut3}/>
                </div>
               </div>
               <div className="section-1">
                    <h1> 03 </h1>
                    <h3>As a Company/Organization</h3>
                    <p>
                       Join other companies in the quest for the spotlight. Get in-depth reviews written by the internal team and 
                       see the interactions flow in. Post available Internship opportunities for prospective Interns to apply and take care of
                       student recommendation by schools!
                    </p>
               </div>
              
               </div> 
               </div>
            </div>

            
        <div className='main-container'>

            
        <Grid container >

        <div className="all-posts" id="posts"><h2>All Posts</h2>
        <div className="list"><div className="list-icon"><ListIcon/></div></div>
        </div>    
    
        
            
            <Grid item xs={12}>
        
       

            <Grid container spacing={1} >
            
            <div className='reviews-container'>

                {reviews.map((review, index) =>{


                 
                return (
                    <>
                   
                    <ReviewItem {...review} key={reviews.id} />
                    
                    </>
                )


                })} 
                    
              <div className="reviews-pagination">
              <Stack spacing={2}>
              
                <Pagination count={10} variant="outlined" shape="rounded" />
             </Stack>
              </div>


                </div>
                </Grid>
            
                </Grid>
                
               
               
       
        </Grid>
        </div>  


         <Grid item xs={12}>

         {/* <div className="student-list-main-container">
                <div className="student-list-container">
                    
                <div className="student-list-header">
                <div className="student-list-content">
                <h2>{students.length}</h2> 
                    <h1>Student Registrations</h1>
                    <div className="std-avatar">
                {students && students.length &&

<AvatarGroup className="student-avatar" max="4" total={students.length}>

{students.map((student, index) => {

    return <Avatar   sx={{width: 50, height: 50}} key={index} alt={student.firstname} src={student.profilePic}/>

    })}


</AvatarGroup>


}
                </div>  
                </div>    
                </div>
              
                <div className="reg-text">
                    <p>Join other students like you across Universities in Nigeria in sourcing for
                        Internship Opportunities
                    </p>
                </div>



                            
                </div>
               

          





</div>

         */}
         <div className='advert-main-container'>
            <div className="advert-wrapper">

            
         <div className='advert-header'>
                 <h2> Available IT Offers </h2>
             </div>
                <div className="advert-container">
             {offers.map((offer, index) => {
                 return (
                     <SingleAdvert {...offer} key={index}/>

                 )

                

             })}
            </div>
            </div>
         </div>
         {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
         <div className="contact-main-container">
            
             <div className="contact-form-container">
             <div className="contact-img">
                 <img src={contact}/>
             </div>
             <div className="contact-items">

            
             <div className='contact-header'>
                 <h2> Contact Us! </h2>
                 <p>Send a message request and let us know what you feel</p>
             </div>
            
                {({errors, touched}) => (

                    <FormControl  sx={{width: '100%'}}>
                                                    
                                    
                    <TextField sx={{fontWeight: 'light'}} className="textfield" 
                    label="Full Name" name="fullname"  value={formValues.fullname}
                    onChange={formValidation}
                    variant="outlined" margin="normal" 
                    type="text" fullWidth error={fullnameError}
                     helperText={formErrors.fullname}/>
                        
                    <TextField className="textfield" 
                    label="Email" onChange={formValidation} name="email" value={formValues.email} 
                    variant="outlined" margin="normal" 
                    type="email" helperText={formErrors.email} error={emailError}/>   
                  


                    <LoadingButton onClick={contactSubmit} loading={false} variant="contained" type="submit" >Send a Message</LoadingButton> 


                    </FormControl>

                )}
            
           
                         
                </div>
             </div>
         </div>
         </Grid>
         </div>   
         </div> 
    )
}
export default BoxContainer;