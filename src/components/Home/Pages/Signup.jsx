import "./Signup.css";
 import React, {useRef,useState, useEffect} from "react";

import { Link, useNavigate} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {FormControl, InputLabel, FormControlLabel, InputBase, Switch, TextField, Radio, RadioGroup, Button, Input } from "@mui/material";


import { signup, useAuth } from "../../../firebase";

 

export default function Signup() {
  const currentUser = useAuth()
   const emailRef = useRef()
   const passwordRef = useRef()
   const passwordConfirmRef = useRef();
   const [error, setError] =useState(false);
   const [emailError, setEmailError] = useState(false)
   const [passwordError, setPasswordError] = useState(false)
   const [confirmError, setconfirmError] = useState(false)
   const [errorText, setErrorText] =useState();
   const [loading, setLoading] =useState(false);
   const [formErrors, setFormErrors] = useState({})
   const [formValues, setFormValues] = useState({
    email: "",
    password:"",
    confirm:""
   })
   const [disabled, setDisabled] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false)   
   let navigate = useNavigate();  


 useEffect(()=> {
        
  setFormErrors(validate(formValues));

  if (Object.keys(formErrors).length > 0) {
    setDisabled(true)
  }
  else {
    setDisabled(false)
  }

        console.log(formValues, `${formErrors.email}`, errorText, formErrors.confirm);
        if (Object.keys(formErrors).length === 0 && isSubmit) {



            console.log("Hello", errorText)
         

        }

        
        // if (Object.keys(formErrors).length > 0 && isSubmit) {

        
        //  console.log("Errors")

        //  }
        // if (formValues.password && formValues.password.length < 6) {
        //     setFormErrors({...formErrors, fullname: "Too short"})
       
        // }
        // else if (!formValues.fullname && isSubmit) {
        //     setFormErrors({...formErrors, fullname: "Name is required"})
      
        // }
        // else {
        //     setFormErrors({...formErrors, fullname: ""})
         
        // }
        //  if (formErrors.fullname === "Too short") {
        //     setfullnameError(true)
        // }

        // if (formErrors.fullname===""){
        //     setfullnameError(false);  
        //     console.log(formValues, formErrors)
        // }
        
        // else if (formErrors.email) {
        //     setEmailError(true)
        // }
        // else if (!formErrors.email) {
        //     setEmailError(false)
            
        // }

       

    }, [formValues, formErrors.email, formErrors.password, formErrors.confirm])

    
    const validate = (values) => {
      const errors = {};
      console.log(values)
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (isSubmit && !values.password) {
          setPasswordError(true); 
          errors.password = "This field can not be empty";
     
      }
      else if (values.password && values.password.length < 6) {
         setPasswordError(true);
          errors.password= "Password must be at least 6 characters"
       
        }
        else {
          setPasswordError(false);
        }
      
      if ( isSubmit && !values.email) {
           setEmailError(true);
          errors.email = "Email is required";
         
      }
      else {
        setEmailError(false);
      }
       if (values.email && !regex.test(values.email)) {
        setEmailError(true);  
        errors.email ="This is not a valid email format"
      }

     if (isSubmit && !values.confirm) {
      errors.confirm = "This field can not be empty";
     }
     else if ( values.password !== values.confirm) {
      setconfirmError(true)
      errors.confirm = "Password must be the same"
     }
     else {
      setconfirmError(false)
     }
      return errors;



  }

  const formValidation = (e) => {
        
    const {name, value} = e.target;
    setFormErrors(validate(formValues));
    
    setFormValues({...formValues, [name]: value});
    
}


    async function handleSubmit(e) {
       e.preventDefault();
        setIsSubmit(true);
          // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          //   setError(true)
          //  return setErrorText("Passwords do not match!")

          // }

if (Object.keys(formErrors).length === 0) {
        
try {
  setLoading(true)
 await signup(emailRef.current.value, passwordRef.current.value)
 setError(false)
 setLoading(false)
 setErrorText("");

  return navigate("/log-in")
console.log("Account Created!")

} catch {

   setEmailError(true)
   
 setErrorText("Failed to create an account")
console.log(emailRef.current.value, passwordRef.current.value,  passwordConfirmRef.current.value)
}
 
setLoading(false)

}  
  }



  
  


  

  return (
      
        <div className="signup-container">
            <div className="form-container">
              <div className="sign-text">
                <h5>JOIN US</h5>
                <h2>Create new account.</h2>
                <p>Already A Member? <Link to="/log-in" className="login">Log in</Link> </p>
              </div>
     
    <div className="form-group">

    <div className="form">
    <FormControl  sx={{width: '100%'}}>
   
   
 
    <TextField name="email" className="textfield"  onChange={formValidation}
      error={emailError} 
       label="Email" variant="outlined" margin="normal" type="email"  inputRef={emailRef} helperText={formErrors.email}/>   
      
      <TextField sx={{fontWeight: 'light'}} name="password" className="textfield" onChange={formValidation}
       label="Password" error={passwordError}  variant="outlined" margin="normal" type="password" fullWidth inputRef={passwordRef}/>

<TextField onChange={formValidation} name="confirm" sx={{fontWeight: 'light'}} className="textfield" 
       label="Confirm Password" error={confirmError} helpertext={formErrors.confirm} variant="outlined" margin="normal" type="password" fullWidth inputRef={passwordConfirmRef}/>

    <LoadingButton disabled={disabled} loading={loading} variant="contained" type="submit" onClick={handleSubmit}> Create Account</LoadingButton> 


    </FormControl>

</div>
        
        </div>
        </div>
        </div>
        
  )
}
