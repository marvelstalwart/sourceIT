import './UpdateProfile.css'
import { useAuth} from '../../../../firebase';
import { onSnapshot, collection, setDoc, doc } from 'firebase/firestore';
import {Button, Checkbox, FormControl, FormControlLabel,FormGroup, RadioGroup, Radio } from '@mui/material'
import { Avatar, Alert, AlertTitle } from '@mui/material';
import Person from '../Person'
import Entity from '../Entity';
import School from './School';
import { db, app } from '../../../../firebase';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export default function UpdateProfile() {
  const filePickerRef = useRef()
  const [fileUrl, setFileUrl] = useState()
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] =useState(false)
  
  // const [profile, setProfile] = useState()
   let location = useLocation();
  // const profile = location.state.profile;

    const currentUser = useAuth();
 
    const  [type, setType] = useState("Individual");
      
      let navigate = useNavigate();

    const person = { firstname:"", middlename: "", lastname:"", username:"", organization:"",   location:"", age: "", school:"" ,skills: "", description:"", email: "", phone: "", type: ""}
    const [formValues, setFormValues] = useState(person);
    const entities = { businessname:"", companyemail: "", year:"", overview:"",    location:"" , phone: "", address: "", website: "", type: ""}
    const [entityValues, setentityValues] = useState(entities);
    const schools = { schoolname: "", location: "", description: "", year:"", email: "", phone: "", address:"", website:"", type:""}
    const [schoolValues, setSchoolValues] = useState(schools);
    
    function profilenavigate() {
      navigate(`/profile/${currentUser?.uid}`)
      }


    const pickedHandler = async (event) => {

      if (event.target.files && event.target.files.length ===1) {

        const  file = event.target.files[0];

        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setFileUrl(await fileRef.getDownloadURL())

      }
      


    }


    useEffect(() => {
      console.log(location.state)
      if (location.state) {


     
      const profile = location.state.profile;
      console.log(profile, profile.type)
      if ( profile && profile.type=== "Organization") {

        setentityValues({...entityValues, businessname: profile.businessname, companyemail:profile.companyemail,
        year: profile.year, overview: profile.overview, location: profile.location, phone: profile.phone, address: profile.address, website: profile.website,  
       type: profile.type })
      }

      else if (profile && profile.type==="Individual") {

        setFormValues({...formValues, firstname: profile.firstname, middlename: profile.middlename,
        lastname: profile.lastname, username:profile.username, location: profile.location,
        age: profile.age, school: profile.school, description: profile.description, skills:profile.skills, email: profile.email, phone: profile.phone
        ,  type: profile.type
      })
      }

      else if (profile && profile.type==="School") {

        setSchoolValues({...schoolValues, schoolname: profile.schoolname, location: profile.location,
         description: profile.description, year: profile.year, email: profile.email, phone: profile.phone,
          address: profile.address, website: profile.website, type: profile.type
      })
      } 
    }
    },[])

   
  //   const getData =() => {
  //     const docRef = doc(db, "users", `${currentUser?.uid}`);
      
  //     const unsub = onSnapshot(docRef, (doc)=> {
        
  //       // const source= doc.metadata.hasPendingWrites ? "Local": "Server";
  //       console.log( "data: ", doc.data());
  //      setProfile({...doc.data(), id: doc.id})
  //       console.log(profile?.middlename)
  //      unsub();
        
  //      setLoading(false)
  //  });
     
  //  };

    console.log(schoolValues.type, schoolValues)
  return (

 <div className="update-container">

   <div className="update-form">
     
     <FormControl>

     <div className="button-container">

    {
      currentUser?.displayName?

      <div className="edit-profile">

        <h2>Edit Your Profile</h2>
     
      </div>
      :

    // console.log( entityValues.businessname,  formValues.firstname, schoolValues.schoolname)
      entityValues.businessname === "" && formValues.firstname ==="" && schoolValues.schoolname==="" &&
      
        
      <>
    
<div className="disabled-container">
 
    <div className="disabled">
            <Alert severity="warning">
             <AlertTitle>NOTICE!</AlertTitle>
          
                <p>Company and School registrations are closed until further notice</p>
           
             </Alert>
        </div>
        </div>     
      
     <div className="three-buttons">
   
       <Button variant="contained" className="button1" onClick={() => { setType("Individual")
      console.log(type)
      }}>Individual</Button>
       <Button variant="contained" disabled={true} className="button1" onClick={() => { setType("Organization")
      console.log(type)
      }}>Organization</Button>
       <Button variant="contained" disabled={true} className="button1" onClick={() => { setType("School")
      console.log(type)
      }}>School</Button>
   </div>  
      </>
     

    }

        
        

      </div>

     </FormControl>

     <div className="update-form-group">
       {/* <div className="update-avatar">
       <Avatar sx={{width: '100px', height: '100px'}}/>
       </div> */}

{type === "Organization" || entityValues.type ==="Organization"?


<Entity
filePickerRef={filePickerRef}
pickedHandler={pickedHandler}
fileUrl={fileUrl}
currentUser={currentUser}
entityValues={entityValues}
 setentityValues={setentityValues}
 type={type}
 onSnapshot={onSnapshot}
 collection={collection}
 setDoc={setDoc}
 doc={doc}
 db={db}
 success={success}
 setSuccess={setSuccess}
 loading={loading}
 setLoading={setLoading}

/>





:


type==="School" || schoolValues.type==="School" ?

       <School
       
       currentUser={currentUser}
       filePickerRef={filePickerRef}
       pickedHandler={pickedHandler}
       fileUrl={fileUrl}
       db={db}
       schoolValues={schoolValues}
       setSchoolValues={setSchoolValues}
       type={type}
       onSnapshot={onSnapshot}
       collection={collection}
       setDoc={setDoc}
       doc={doc}
       success={success}
       setSuccess={setSuccess}
       loading={loading}
       setLoading={setLoading}
       
       />






  : 
  (type==="Individual" || formValues.type === "Individual") &&
<Person  currentUser={currentUser} 
  filePickerRef={filePickerRef}
  pickedHandler={pickedHandler}
  fileUrl={fileUrl}
formValues={formValues}
 setFormValues={setFormValues}
 type={type}
 onSnapshot={onSnapshot}
 collection={collection}
 setDoc={setDoc}
 doc={doc}
 db={db}

 success={success}
 setSuccess={setSuccess}
 loading={loading}
 setLoading={setLoading}
 />
}
</div>
    
    </div>

    {success && <Alert
    className='alert'
    severity="success"

    > Update complete! 
    <Button onClick={profilenavigate}>Back to Profile</Button>
    </Alert>}

     
     </div>
  )
}
