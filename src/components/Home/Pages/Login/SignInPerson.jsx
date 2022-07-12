import React from 'react'
import {FormControl, FormControlLabel, TextField, Radio, RadioGroup, Button, Input } from "@mui/material";

export default function SignInPerson() {
  return (
   <div className="form">
     <FormControl sx={{width: "340px"}}> 
      
     <TextField className="textfield" id="filled-basic"
      
      label="Username/Email" variant="outlined"
      margin="normal"
      fullWidth
      />

<TextField className="textfield" id="filled-basic"
      
      label="Password" variant="outlined"
      margin="normal" type="password"
      fullWidth
      />

<TextField className="textfield" id="filled-basic"
      
      label="Confirm Password" variant="outlined"
      margin="normal" type="password"
      fullWidth
      />
     <Button variant="contained"> Sign In</Button>
      

     </FormControl>
     
   </div>
  )
}
