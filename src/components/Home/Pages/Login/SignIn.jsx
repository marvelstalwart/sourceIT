import "./SignIn.css"
import { Link, useNavigate } from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import React, {useState, useRef} from "react";
import { Button, FormControl, TextField } from "@mui/material";
import SignInEntity  from "./SignInEntity";
import SignInPerson from "./SignInPerson";

import { login, useAuth } from "../../../../firebase";





export default function SignIn() {
      const currentUser = useAuth()
      const emailRef = useRef()
      const passwordRef = useRef()
      const [error, setError] =useState(false);
      const [errorText, setErrorText] =useState();
      const [loading, setLoading] =useState(false);


      let navigate = useNavigate();  

      async function handleSubmit(e) {
         e.preventDefault();
  
          
  try {
    setLoading(true)
   await login(emailRef.current.value, passwordRef.current.value)
   setError(false)
   
   setErrorText("");
   return navigate("/");
   
  
  
  } catch {
     setError(true)
   setErrorText("Failed to sign in")
  console.log(loading,emailRef.current.value)

  }
   
  setLoading(false)
    }
  
  
  
    return (
        
          <div className="signin-container">
            
              <div className="form-container">
              
              <div className="login-text"><h2> Log in to your account,</h2>
       
            <p>Don't have an account? <Link to={"/create-account"} className="sign-up">Sign Up</Link></p></div>
   
      <div className="form-group">
  
      <div className="form">
     <FormControl sx={{width: "340px"}}> 

     <TextField className="textfield" id="filled-basic"
      
      label="Email" variant="outlined"
      margin="normal"
      fullWidth
      error={error} helperText={errorText}
      inputRef={emailRef}
      />

<TextField className="textfield" id="filled-basic"
      
      label="Password" variant="outlined"
      margin="normal" type="password"
      fullWidth
      error={error} helperText={errorText}
      inputRef={passwordRef}
      />

         <LoadingButton variant="contained" onClick={handleSubmit} loading={loading}> Sign In</LoadingButton>

           </FormControl>
     
   </div>
          
          </div>
          </div>
          </div>
          
    )
  }
