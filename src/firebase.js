import firebase from "firebase/compat/app"
import {initializeApp} from "firebase/app"

import { getFirestore } from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { useEffect, useState } from "react";
import "firebase/compat/storage"
import "firebase/firestore"

console.log(process.env.REACT_APP_MY_ENVIRONMENT_VARIABLE)
export const app=firebase.initializeApp({

    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

});



const auth = getAuth();

export function signup(email, password) {
 
    return createUserWithEmailAndPassword(auth, email, password)
}

export function login (email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export function logout () {

    return signOut(auth);
}
export function useAuth() {
const [currentUser, setCurrentUser] = useState()
    
useEffect(()=> {

const unsubscribe =   onAuthStateChanged(auth, user=>setCurrentUser(user))

return unsubscribe;
},[])    
    
    
    return currentUser;
}

export const db = getFirestore();