import React from 'react'
import {FormControl,Select, InputLabel, FormControlLabel, InputBase, Switch, TextField, Radio, RadioGroup, Input, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updateProfile } from "firebase/auth";

export default function School({fileUrl, pickedHandler, filePickerRef, type, db, currentUser, schoolValues, setSchoolValues, setDoc, doc, success, setSuccess, loading, setLoading}) {
 

    const states= [
        
        "Abia", "Adamawa","Akwa Ibom", "Anambra", "Bauchi", "Bayelsa","Benue","Borno","Cross River ","Delta","Ebonyi ","Edo","Ekiti ","Enugu",
        "Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi" ,"Kwara ","Lagos ","Nasarawa","Niger","Ogun" ,"Ondo" ,"Osun" ,"Oyo" ,"Plateau" ,"Rivers" 
        ,"Sokoto ","Taraba ","Yobe" ,"Zamfara" 
            ];

            
    const handleChange =(e) => {
        const {name, value} = e.target;
        setSchoolValues({...schoolValues, [name]: value})
    
        console.log(schoolValues.location)
      }
      
      
    
  const addItems = async () => {
    try {

      setLoading(true)

      updateProfile(currentUser, {displayName:`${schoolValues.name}`, photoURL: `${fileUrl}`}).then((userRecord) => {
         console.log("Successfully Updated Record")
      }).catch((error) => {
         console.log("Cannot Update", error)
       })
  
     
      const docRef = doc(db, "users", `${currentUser.uid}`);
      const payload = {schoolname: schoolValues.schoolname, 
        email: schoolValues.email, 
        year: schoolValues.year, description: schoolValues.description,
         location: schoolValues.location, address: schoolValues.address, 
         phone: schoolValues.phone, website: schoolValues.website, profilePic: fileUrl, type: "School" }
        
        await setDoc(docRef, payload);
        setSuccess(true);
        setLoading(false)
    } catch {
    
      console.log("Unable to update", schoolValues.schoolname, 
      schoolValues.email, schoolValues.year, schoolValues.description, 
      schoolValues.location, type, fileUrl )
      
    }
      
    setLoading(false)
    
      }
    
    return (
    <div className='school-form'>

            
    <div className="form">
      
      <FormControl className="formControl" sx={{width: '340px'}}>
        
      {/* <TextField
    id="outlined-name"
    label="Name"
    value={schoolValues.businessname}
    onChange={handleChange}
  /> */}
      <div className="upload-section">
        <label htmlFor="icon-button-file" className="label">
      
        <Input ref={filePickerRef} size="small" accept="image/*" id="icon-button-file" type="file" onChange={pickedHandler} name={`${schoolValues.profilePic}`} placeholder="Choose Profile Picture"/>
       
      </label></div>
        <TextField className="textfield"  id="filled-basic"
        value={`${schoolValues.schoolname}`}
        label="School Name" variant="outlined"
        margin="normal" size='small' name="schoolname"
        onChange={handleChange}
        fullWidth
        />
       
        <TextField className="textfield" id="filled-basic" value={`${schoolValues.email}`}
         label=" School Email" variant="outlined" margin="normal" type="email" size='small' name="email" onChange={handleChange} fullWidth/>
  
  
          
                <TextField value={`${schoolValues.location}`} margin="normal" className="textfield" label="Location" select size='small'  name="location" onChange={handleChange}>
                
                {states.map((state, index) => {
                    return (
                    <MenuItem  key={index} value={state}>{state}</MenuItem>
                    )

                })}



                
                
                </TextField>
                        
          <div className="single-input">
            <div className="text-area">
           <textarea  id="description"  defaultValue={`${schoolValues.description}`} placeholder="Description" typeof="text" name="description" onChange={handleChange} >
  
  
              </textarea>
              </div>
              </div>
              <TextField className="textfield" id="filled-basic"
        value={`${schoolValues.year}`}
         label="Year Created" variant="outlined" margin="normal"  size='small' name="year" onChange={handleChange} fullWidth/>
  
            
               <TextField className="textfield" id="filled-basic" value={`${schoolValues.address}`}
         label=" Address" variant="outlined" margin="normal" type="text" size='small' name="address" onChange={handleChange} fullWidth/>
  
        <TextField className="textfield" id="filled-basic" value={`${schoolValues.phone}`}
         label=" Phone" variant="outlined" margin="normal" type="text" size='small' name="phone" onChange={handleChange} fullWidth/>
  
               <TextField className="textfield" id="filled-basic" value={`${schoolValues.website}`}
         label=" Website" variant="outlined" margin="normal" type="text" size='small' name="website" onChange={handleChange} fullWidth/>
      
      <div className="update-button-container">
      <LoadingButton loading={loading} variant="contained" onClick={addItems}>  Update Details</LoadingButton>
      </div>
      </FormControl>
  
  </div>    



    </div>
  )
}
