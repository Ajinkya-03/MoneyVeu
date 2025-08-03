import React, { useEffect } from 'react'
import "./style.css";
import { auth } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { toast } from "react-toastify"; 
import { FaSignOutAlt } from "react-icons/fa";

function Header() {
  
  const [user , loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(user)
    {
      navigate("/dashboard");
    }
  
  }, [user, loading])
  
  
  function logoutfnc() {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");  
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
    
  return (
    <div className="navbar">
    <p className='logo'>MoneyVue</p>
    {user &&(
      <p className="logout" onClick={logoutfnc}>Logout <FaSignOutAlt style={{ position: "relative", top: "2px" }}/></p>
    )}
    
    </div>
  )
}


export default Header