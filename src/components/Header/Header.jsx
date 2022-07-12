import './Header.css'
import {RiMenuLine, RiCloseLine} from "react-icons/ri";
import  logo from "../../assets/img/project.png"
import AdbIcon from '@mui/icons-material/Adb';
import {Link} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import React, {useState} from "react";
import { useAuth } from '../../firebase';
import { logout } from '../../firebase';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Icon } from '@mui/material';
import { Avatar } from '@mui/material';


const Header = () => {
   
   const currentUser = useAuth();
    const [toggleMenu, setToggleMenu] = useState(false);
    
    let navigate = useNavigate();
    async function handleLogout() {

        try {

            await logout()
            navigate("/log-in");
            
            
        }
        catch {
            alert("Error");

        }
        

    }

return (

    <>
    <div className="headerWrapper">
        <div className='headerRight'>
            <div className='logoContainer'>
               <h2>𝓼𝓸𝓾𝓻𝓬𝓮𝓲𝓽</h2>
            </div>
            <div className='headerRightLinks'>
            <h4> <Link to="/">Home</Link></h4>
            {/* <h4> <a href="#how-it-works">How it Works</a></h4>
            <h4> <a href="#posts">Posts</a></h4> */}
            <h4> <Link to="/offers">Vacancies</Link></h4>
            {currentUser && 
                
            <div className='profile-icons'>

{!currentUser?.displayName &&  <PriorityHighIcon className='priority'/>}
<h4><Link to={`profile/${currentUser.uid}`}>Profile </Link></h4>

            </div>
           }

            {currentUser?.email === "admin@intern.com" && 
            <h4><Link to="/create-post"> Create Post</Link></h4>
            }
            

            </div>
        </div>
      

        <div className='headerLeft'>

        <div className='headerLeftLinks'>
          
          {currentUser?  
            <div className="logged-in">

                <Avatar onClick={handleLogout} src={currentUser?.photoURL}/>
            <div className="logout-button" onClick={handleLogout}><button >Log out</button></div>
            </div>
        
        //   <button   onClick={handleLogout}>Sign Out</button> 
          
          
          :
          
          
          <Link to="/log-in"> <button   >LOGIN</button></Link>
          
          
          }

           
            
            
         </div>
       
           <div className='navBarMenu'>
            {toggleMenu ? <RiCloseLine color="white" size={27} onClick={()=> setToggleMenu(false)}/>
            
            :  <RiMenuLine color="white" size={27} onClick={()=> setToggleMenu(true)}/>  }
           


           {toggleMenu && (

<div className='navBarMenuContainer'>

    <div className='navBarMenuContainerLinks'>
    <p> <Link to="/">HOME</Link></p>
   
           <div className="nav-profile">
           {currentUser &&  <p><Link to={`profile/${currentUser?.uid}`}> <a>PROFILE </a></Link></p>}
          
           </div>
            <p><Link to="/offers"> <a href="home">VACANCIES</a></Link></p>

    <div className='navBarMenuLinks'>
        {currentUser?
        <p><Link to="/log-in"><a href="home" onClick={handleLogout}>LOG OUT </a></Link> </p>
    
    :
    
    <p><Link to="/log-in"> <a href="home">LOG IN </a></Link></p>
    }
   
     
         
         
         
     </div>

    </div>
</div>
)}


           
          
           </div>
        </div>

    </div>
    <div className="line2"><hr></hr></div>
    </>
)


}

export default Header;