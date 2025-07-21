import React from 'react'
import "./style.css"

function Button({text, OnClick, black}) {
  return (
    <div className={black?"btn btn-black":"btn"} 
    onClick={OnClick}>{text}</div>
  )
}

export default Button