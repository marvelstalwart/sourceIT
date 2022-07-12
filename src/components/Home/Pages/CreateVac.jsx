import "./CreatePost.css";
import React, {useRef, useState } from "react";
import { TextField, MenuItem, Input } from "@mui/material";
import {LoadingButton} from "@mui/lab";
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.snow.css'
import {useQuill} from "react-quilljs"
import {useEffect} from "react"
import "./CreateVac.css"
import { app } from "../../../firebase";
import { db, useAuth } from "../../../firebase";

import { useNavigate } from 'react-router-dom';
import { MdUploadFile , MdModeEdit } from 'react-icons/md';


import { getDoc, onSnapshot, collection, addDoc, doc, query, where, getDocs } from 'firebase/firestore';

export default function CreateVac() {
    let navigate = useNavigate()
    const currentUser = useAuth()
    const [loading, setLoading] = useState(false)
    const [postTitle, setPostTitle] = useState("")
    const [content, setContent] = useState();
    const { quill, quillRef } = useQuill();
    const [category, setCategory] = useState("");
    const [data, setData]  = useState([]);
    useEffect(() => {
        if (quill) {
          quill.on('text-change', (delta, oldDelta, source) => {
          
            setContent(quill.root.innerHTML);
             
          });
        }
        getAdditionalData();
      }, [quill, currentUser?.uid, data.id]);

      const getAdditionalData = ()=> {
        const userData = doc(db, "users", `${currentUser?.uid}`)
        const unsub = onSnapshot(userData, (doc) => {

          setData({...doc.data(), id: doc.id})
          
        })
        console.log(data)
        return unsub;

      } 

      const postCollectionRef= collection(db, "vacancies");
      const addVacancy = async () => {

  
        try {
          setLoading(true)
          const postCollectionRef= collection(db, "vacancies");
         
          
          const payload = { title: postTitle, content: content,  authorId: currentUser?.uid, name: data.businessname, 
            location: data.location, address: data.address, email: data.companyemail, website: data.website, profilePic: data.profilePic}
          await addDoc (postCollectionRef, payload);
          setLoading(false)
          navigate(`/offers`)
  
        }

  
        catch {
          console.log("Unable to update");
        }
  
        setLoading(false)
  
      }
  
      
  return (
    <div className="vac-main-container">
      <div className="vac-container">

      
      <div className="vac-heading"><h1>Create a New Vacancy</h1></div>
      <div className="vac-form">
       <textarea placeholder="Position; E.G (Phython Backend Developer)" name="title" id="title" onChange={(event) => { setPostTitle(event.target.value)
      
       
        }}></textarea>

        <div className="quill">

        <div style={{ width: "100%"}}>
        <div ref={quillRef} className="quill-edit"/>
        </div>


        </div>
        <div className="create-vac-button">
        <LoadingButton loading={loading} className="vac-button" onClick={addVacancy}>Create Post </LoadingButton>
      </div>
    </div>
    </div>
    </div>
  )
}
