import React from 'react'
import "./style.css";
function Header() {

  function logoutfnc(){
    alert("Logged out!!")
  }

  return (
    <div className="navbar">
    <p className='logo'>MoneyVue</p>
    <p className="logout" onClick={logoutfnc}>Logout</p>
    </div>
  )
}

export default Header