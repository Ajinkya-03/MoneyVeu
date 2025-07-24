import React, { useEffect } from 'react'
import "./style.css";
import { auth } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";

function Header() {
  
  const [user , loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(user)
    {
      navigate("/dashboard");
    }
  
  }, [user, loading])
  
  
  function logoutfnc(){

    alert("Logged out!!")
  }

  return (
    <div className="navbar">
    <p className='logo'>MoneyVue</p>
    {user &&(
      <p className="logout" onClick={logoutfnc}>Logout</p>
    )}
    
    </div>
  )
}

export default Header