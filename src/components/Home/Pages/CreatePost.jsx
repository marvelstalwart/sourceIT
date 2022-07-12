import "./CreatePost.css";
import React, {useRef, useState } from "react";
import { TextField, MenuItem, Input } from "@mui/material";
import {LoadingButton} from "@mui/lab";
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.snow.css'
import {useQuill} from "react-quilljs"
import {useEffect} from "react"
import { app } from "../../../firebase";
import { db, useAuth } from "../../../firebase";

import { useNavigate } from 'react-router-dom';
import { MdUploadFile , MdModeEdit } from 'react-icons/md';


import { onSnapshot, collection, addDoc, doc, query, where, getDocs } from 'firebase/firestore';

export default function CreatePost() {

  
  const { quill, quillRef } = useQuill();
 
  const filePickerRef = useRef();
  const [fileUrl, setFileUrl] = useState();
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryData, setCategoryData] = useState();
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState()
  const currentUser = useAuth();
  let navigate= useNavigate();
  const [name, setName] =useState("");
  // const userCollectionRef = (db, "users");
  const userRef= collection(db, "users");
  let comments =  [];
  const organizationList = query(userRef, where ("type", "==", "Organization"))
  //  const organisationList = query(userCollectionRef, where ("location", "==", "Delta"))
   
  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
      
        setContent(quill.root.innerHTML);
         
      });
    }
  }, [quill]);

  

  useEffect (() => {

    
     return getCategories();

  
    
   
  },[])
  
  const getCategories= async () => {

    const data = await getDocs(organizationList);
    setCategoryData(data.docs.map((doc) =>

     (
       {...doc.data(), id: doc.id}
       )
      
     ))

     {console.log(categoryData)}
     
     
    


  }

  const pickedHandler = async (event) =>{

  
    if (event.target.files && event.target.files.length===1) {

      const file = event.target.files[0];
      const storageRef = app.storage().ref()
      const fileRef =storageRef.child(file.name)

      
      await fileRef.put(file)
       setFileUrl(await fileRef.getDownloadURL())
       
      
    }

  }
  const postCollectionRef= collection(db, "posts");
    const addPost = async () => {

      try {
        setLoading(true)
        const postCollectionRef= collection(db, "posts");
       
        
        const payload = {cover: fileUrl, title: postTitle, content: content, category: category, businessname: name, authorId: currentUser?.uid, comments: comments}
        await addDoc (postCollectionRef, payload);
        setLoading(false)
        navigate("/profile")

      }

      catch {
        console.log("Unable to update", currentUser?.uid, postCollectionRef.key, fileUrl, postTitle, content, category);
      }

      setLoading(false)

    }


    function pickedImageHandler () {

      filePickerRef.current.click();
    }
  // const handleChange = (e) => {


  //   const  [name, value] = e.target;
  //   setNewPost({...newPost, [name]: value})
  //   console.log(post.title)



  // }

  const categories= [
        
    "Eridan", "Nigerian Port Authority", "Deloitte", "Chevron", "Ntel"
        ];

  
  return (
    <div className="create-post-container">
      <div className="create-post-body">
      

      <textarea placeholder="Title" name="title" id="title" onChange={(event) => { setPostTitle(event.target.value)
      
       
      }}></textarea>

      <div className="image-upload">

      <label htmlFor="image-upload">Upload Your Cover Picture</label>
        <input
        id="image-upload"
        placeholder="Upload Cover"
        
        ref={filePickerRef}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
        
        />
       
        {/* <MdUploadFile
        size={"30px"}
        id="image-upload"
        /> */}
     
      </div>
     <div className="quill">

        <div style={{ width: "100%"}}>
          <div ref={quillRef} className="quill-edit"/>
        </div>

    
       </div>
      <div className="create-post-footer">
       <TextField  defaultValue=""  className="select" size='small' label="Category" id="category" name="category" onChange={(event) => { setCategory(event.target.value)
       setCategoryId(category.id)
       console.log( "category id is", categoryData.id)
       console.log(category)
      
      }} select  fullWidth >

        {categoryData && categoryData.map((category, index) => {
         
            return (
            <MenuItem key={index} value={category.id} onClick={()=> {setName(category.businessname )}}>{category.businessname}</MenuItem>
            )
 
        })}



      </TextField>
     
     <div className="create-post-button">
        <LoadingButton loading={loading} className="create-button" onClick={addPost}>Create Post </LoadingButton>
      </div>
      </div>
     </div>
      
    </div>
  )
}
