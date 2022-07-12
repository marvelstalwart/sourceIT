import React, {useState} from 'react'

export default function formValidation(formValues) {


let errors = {firstname: false, lastname: false, username: false, email:false, school:false  }

let errorTexts = {firstname: "", lastname: "", username: "", email:"", school:"" }

if (!formValues.firstname.trim()) {
    errors.firstname=true
    errorTexts.firstname="First name Required"
}

if (!formValues.lastname.trim()) {
    errors.lastname=true
    errorTexts.lastname="Last name Required"
}

//Email
if (!formValues.email) {

    errors.email=true

} else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(formValues.email)) {
    errors.email= true
    errorTexts.email= "Email address is invalid"

}

if (!formValues.username.trim()) {
    errors.username=true
    errorTexts.username="Username Required"
}

}
