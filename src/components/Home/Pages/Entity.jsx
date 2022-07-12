import React, {useState} from "react";
import {FormControl,Select, InputLabel, FormControlLabel, InputBase, Switch, TextField, Radio, RadioGroup, Input, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updateProfile } from "firebase/auth";
    const states= [
        
"Abia", "Adamawa","Akwa Ibom", "Anambra", "Bauchi", "Bayelsa","Benue","Borno","Cross River ","Delta","Ebonyi ","Edo","Ekiti ","Enugu",
"Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi" ,"Kwara ","Lagos ","Nasarawa","Niger","Ogun" ,"Ondo" ,"Osun" ,"Oyo" ,"Plateau" ,"Rivers" 
,"Sokoto ","Taraba ","Yobe" ,"Zamfara" 
    ];


    

export default function Entity({fileUrl,filePickerRef, pickedHandler, profile, type, setLoading, entityValues, setentityValues, db, currentUser, doc, setDoc, success, setSuccess}) {

console.log("Values",entityValues)
 
  const handleChange =(e) => {
    const {name, value} = e.target;
    setentityValues({...entityValues, [name]: value})

    console.log(entityValues.location)
  }

    
  const addItems = async () => {
    try {

      setLoading(true)

      updateProfile(currentUser, {displayName:`${entityValues.businessname}`, photoURL: `${fileUrl}`}).then((userRecord) => {
        console.log("Successfully Updated Record")
      }).catch((error) => {
        console.log("Cannot Update", error)
      })
  
     
      const docRef = doc(db, "users", `${currentUser.uid}`);
      const payload = {businessname: entityValues.businessname, 
        companyemail: entityValues.companyemail, 
        year: entityValues.year, overview: entityValues.overview,
         location: entityValues.location, address: entityValues.address, 
         phone: entityValues.phone, website: entityValues.website, profilePic: fileUrl, type: "Organization" }
        await setDoc(docRef, payload);
        setSuccess(true);
        setLoading(false)
    } catch {
    
      console.log("Unable to update", entityValues.businessname, 
      entityValues.companyemail, entityValues.year, entityValues.overview, 
      entityValues.location, type )
      
    }
      
    setLoading(false)
    
      }

  return (
    <div className="organization-form">


    <div className="form">
      
    <FormControl className="formControl" sx={{width: '340px'}}>
      
    {/* <TextField
  id="outlined-name"
  label="Name"
  value={entityValues.businessname}
  onChange={handleChange}
/> */}
    <div className="upload-section">
      <label htmlFor="icon-button-file" className="label">
    
      <Input ref={filePickerRef} size="small" accept="image/*" id="icon-button-file" type="file" onChange={pickedHandler} name={`${entityValues.profilePic}`} placeholder="Choose Profile Picture"/>
     
    </label></div>
      <TextField className="textfield"  id="filled-basic"
      value={`${entityValues.businessname}`}
      label="Official Business Name" variant="outlined"
      margin="normal" size='small' name="businessname"
      onChange={handleChange}
      fullWidth
      />
     
      <TextField className="textfield" id="filled-basic" value={`${entityValues.companyemail}`}
       label=" Company Email" variant="outlined" margin="normal" type="email" size='small' name="companyemail" onChange={handleChange} fullWidth/>


        
      <TextField className="textfield" id="filled-basic"
      value={`${entityValues.year}`}
       label="Year of creation" variant="outlined" margin="normal"  size='small' name="year" onChange={handleChange} fullWidth/>

        <div className="single-input">
          <div className="text-area">
         <textarea  id="description"  defaultValue={`${entityValues.overview}`} placeholder="Overview of the company" typeof="text" name="overview" onChange={handleChange} >


            </textarea>
            </div>
            </div>
        <TextField value={`${entityValues.location}`} margin="normal" className="textfield" label="Location" select size='small'  name="location" onChange={handleChange}>

            {states.map((state, index) => {
                return (
                <MenuItem  key={index} value={state}>{state}</MenuItem>
                )

            })}


        
            
             
             </TextField>
             <TextField className="textfield" id="filled-basic" value={`${entityValues.address}`}
       label=" Address" variant="outlined" margin="normal" type="text" size='small' name="address" onChange={handleChange} fullWidth/>

      <TextField className="textfield" id="filled-basic" value={`${entityValues.phone}`}
       label=" Phone" variant="outlined" margin="normal" type="text" size='small' name="phone" onChange={handleChange} fullWidth/>

             <TextField className="textfield" id="filled-basic" value={`${entityValues.website}`}
       label=" Website" variant="outlined" margin="normal" type="text" size='small' name="website" onChange={handleChange} fullWidth/>
    
    <div className="update-button-container">
    <LoadingButton variant="contained" onClick={addItems}>  Update Details</LoadingButton>
    </div>
    </FormControl>

</div>
</div>
  )
}
