import  {  FormControl, MenuItem, TextField, FormControlLabel, Switch, InputBase, Radio, RadioGroup, Button, Input, InputLabel } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { getAuth } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { updateCurrentUser } from "firebase/auth";


export default function Person({fileUrl, pickedHandler, filePickerRef, type, db, currentUser, formValues, setFormValues, onSnapshot, collection, setDoc, doc, success, setSuccess, loading, setLoading}) {

    const schools = ["Crawford University", "Convenant University", "Babcock University", "Bells University"]
   const states= [
        
    "Abia", "Adamawa","Akwa Ibom", "Anambra", "Bauchi", "Bayelsa","Benue","Borno","Cross River ","Delta","Ebonyi ","Edo","Ekiti ","Enugu",
    "Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi" ,"Kwara ","Lagos ","Nasarawa","Niger","Ogun" ,"Ondo" ,"Osun" ,"Oyo" ,"Plateau" ,"Rivers" 
    ,"Sokoto ","Taraba ","Yobe" ,"Zamfara" 
        ];

       const uid = currentUser?.uid;

  const handleChange =(e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value})
    
  
  }



  const addItems = async () => {

    
    try {
      setLoading(true)

      updateProfile(currentUser, {displayName:`${formValues.username}`, photoURL: `${fileUrl}`}).
    then((userRecord) => {
      console.log("Successfully Updated Record")
    }).catch((error) => {
      console.log("Cannot Update", error)
    })

    console.log(formValues)


      const docRef = doc(db, "users", `${currentUser.uid}`);
      
      const payload = {profilePic: fileUrl ,firstname: formValues.firstname, 
        middlename: formValues.middlename, 
        lastname: formValues.lastname, username: formValues.username,
         age: formValues.age, location: formValues.location, 
        phone: formValues.phone, email: formValues.email,
        school: formValues.school , skills: formValues.skills, description: formValues.description, type: type}
        await setDoc(docRef, payload);
        setSuccess(true);
        setLoading(false)
        console.log(formValues)
        console.log(success)
    } catch {
    
      console.log("Unable to update", formValues.firstname, formValues.middlename, 
     formValues.lastname, formValues.username,  formValues.age,  formValues.location, 
      formValues.phone, formValues.email,
     formValues.school, formValues.description, formValues.skills)
      
    }
      
    setLoading(false)
    
      }
  

      // const Input = styled('input')({
      //   display: 'none',
      // });
      

  return (
    <div className="person-form">
     
   <div className="upload-section">
   

    <label htmlFor="icon-button-file">
      
        <Input ref={filePickerRef} size="small" accept="image/*" id="icon-button-file" type="file" onChange={pickedHandler} name={`${formValues.profilePic}`} placeholder="Choose Profile Picture"/>
       
      </label>
      </div>
      <div className="form-section">

     
      <FormControl sx={{width: '100%'}}>

      <div className="single-input">
      
      <div className="label"><label htmlFor="firstname">FIRST NAME: </label></div>
      
        <InputBase className="textfield" id="firstname"
          name="firstname"
           variant="outlined"
           value={`${formValues.firstname}`}
        onChange={handleChange}
        required fullWidth
          />
         </div>
    
        </FormControl>

        <FormControl sx={{width: '100%'}}>

          <div className="single-input">
            <div className="label"> <label htmlFor="firstname">MIDDLE NAME: </label></div>
        
          <InputBase className="textfield" id="middlename"
          name="middlename"
           variant="outlined"      onChange={handleChange} 
          required fullWidth
          value={`${formValues.middlename}`}
          />
          </div>
 
       </FormControl>

       <FormControl sx={{width: '100%'}}>


        <div className="single-input">
          <div className="label"><label htmlFor="firstname">LAST NAME: </label></div>
       
       <InputBase className="textfield" id="outlined-basic"
      name="lastname"
      value={`${formValues.lastname}`}
        variant="outlined"      onChange={handleChange} 
       required={true} fullWidth/>

      </div>  
      </FormControl>

      <FormControl sx={{width: '100%'}}>

       <div className="single-input">
         <div className="label"><label htmlFor="firstname">USERNAME: </label></div>
       
              <InputBase className="textfield" id="outlined-basic"
              name="username"
              value={`${formValues.username}`}
                  variant="outlined"   
                  onChange={handleChange}
                  required fullWidth/>
                  </div>
                  </FormControl>

                  <FormControl sx={{width: '100%'}}>

                    <div className="single-input">
                      <div className="label"><label htmlFor="firstname">EMAIL: </label></div>

                          <InputBase className="textfield" id="outlined-basic"
                          name="email"
                          value={`${formValues.email}`}
                              variant="outlined"   
                              onChange={handleChange}
                              required fullWidth/>
                              </div>
                              </FormControl>

                              <FormControl sx={{width: '100%'}}>

                        <div className="single-input">
                          <div className="label"><label htmlFor="firstname">PHONE: </label></div>

                              <InputBase className="textfield" id="outlined-basic"
                              name="phone"
                              value={`${formValues.phone}`}
                                  variant="outlined"   
                                  onChange={handleChange}
                                  required fullWidth/>
                                  </div>
                                  </FormControl>
                  
                  <FormControl sx={{width: '100%'}}>

              <div className="single-input">
                <div className="label"><label htmlFor="Location">LOCATION: </label></div>
        
              
                <TextField label="Select" name="location" select  value={`${formValues.location}`} fullWidth onChange={handleChange}>

                      {states.map((state, index) => {
                          return (
                          <MenuItem  key={index} value={state}>{state}</MenuItem>
                          )

                      })}
                  
                      
                      
                      </TextField>
                      </div>
                      </FormControl>
    
                      <FormControl sx={{width: '100%'}}>

     <div className="single-input">
       <div className="label"><label htmlFor="school">SCHOOL: </label></div>
       <TextField label="Select" name="school" select  value={`${formValues.school}`} fullWidth onChange={handleChange}>

{schools.map((school, index) => {
    return (
    <MenuItem  key={index} value={school}>{school}</MenuItem>
    )

})}



</TextField>

        {/* <InputBase sx={{fontWeight: 'light'}} className="textfield" id="school"
        name="school"
        value={`${formValues.school}`}
        label="(Optional)" variant="outlined"  onChange={handleChange} fullWidth
        /> */}
         </div>


          </FormControl>
          <FormControl sx={{width: '100%'}}>

        <div className="single-input">
          <div className="label"><label htmlFor="age">AGE: </label></div>
      
        <InputBase sx={{fontWeight: 'light'}} className="textfield" id="age"
        name="age"
        value={`${formValues?.age}`}
         variant="outlined"   onChange={handleChange}
         fullWidth
       />
        </div>
    
      </FormControl>
      <FormControl >

     <div className="single-input">
       
      <div className="label"><label htmlFor="Skills">SKILLS: </label></div>
     <div className="student-text-area">
        <textarea           value={`${formValues.skills}`}  id="skills" placeholder="(Skills)" typeof="text" name="skills" onChange={handleChange}>


        </textarea>
        </div>

     </div>
     </FormControl>
     <FormControl>

<div className="single-input">
  
 <div className="label"><label htmlFor="Description">DESCRIPTION: </label></div>
<div className="student-text-area">
   <textarea           value={`${formValues.description}`}  id="description" placeholder="(A little Information about you)" typeof="text" name="description" onChange={handleChange}>


   </textarea>
   </div>

</div>
</FormControl>
</div>
        <div className="update-button-container">
          <LoadingButton loading={loading} variant="contained" onClick={addItems} className="updateButton"> Update Details</LoadingButton>
       </div>
  
   

</div>
  )
}
