import React, { useState } from 'react'
import { LoadingButton } from '@mui/lab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {FormHelperText, FormLabel, FormControl, FormGroup, FormControlLabel, Divider, Avatar, Checkbox, Modal, Box, Button, Typography, AvatarGroup, unstable_composeClasses } from '@mui/material'

export default function RecommendModal({ sendingMail, sent, sendEmail, form, disabled, handleSubmit, error, studentsChecked, checked, setStudentState, studentState, checkState, checkHandler,open, handleClose, students}) {
 
  return (
    <div>
         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          {
            sent ? 
            <Box className='modal-box'>
            <div className="email-sent">

            <div className='contents'>
            
            <CheckCircleIcon className="sent-icon"/>
            <div className="email-sent-text">
              <h1>EMAIL SENT</h1>
              <p>Kindly Await A Response</p>
            </div>
            </div>
            </div>
            </Box>
            :
            <Box className='modal-box'>
                
            <Typography  className="recommend-title" id="modal-modal-title" variant="h6" component="h2">
           RECOMMEND YOUR STUDENTS FOR INTERNSHIP
           </Typography>

            {
            students && students.length == 0?

            <div className="no-students">
                <h3>You don't have any registered student yet</h3>
            </div>

            :
            
            students && students.length>0?
            
            <>
            <AvatarGroup className='avatar-group' max={4} total={students.length}>
            {students.map((student, index) => {

                return <Avatar key={index} alt={student.firstname} src={student.profilePic}/>


            })}
            </AvatarGroup>
            <Divider></Divider>
            <div className="students-container">
            <div className="notification"><h5>*You can only recommend three students per session*</h5></div>

            <div className="student-list">
            <FormControl variant='standard'
            error={error}
            >
            <FormGroup>
                {students.map((student, index) => {
                   
                 
                    return <><FormControlLabel
                        
                     control={ <Checkbox checked={checked} disabled={false} name={student.firstname+student.lastname} onChange={(event, student)=>checkHandler(event, student)}></Checkbox>}
                        
                        label={student.firstname + " " + student.lastname}
                        />
                    </> 
                       
                       
                
                }
                
                
                        )}
                        </FormGroup>
                       
                       
                        {error &&  <FormHelperText>You can only select a maximum of three students</FormHelperText> }
                       </FormControl>

            </div>
            <div className="recommend-button"><LoadingButton loading={sendingMail} variant='contained' disabled={disabled} onClick={(e)=> sendEmail(e)}>SUBMIT</LoadingButton></div>
          
            </div>

          
            </>
                
            :
            <div><p>Fetching Students...</p></div>
        
            }
                

            </Box>



          }
          
      </Modal>


    </div>
    
  )
}
