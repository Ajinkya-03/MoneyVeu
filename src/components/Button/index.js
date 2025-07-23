import React from 'react'
import "./style.css"

function Button({text, OnClick, black, disabled}) {
  return (
    <div className={black?"btn btn-black":"btn"} onClick={OnClick} disabled={disabled}>
      {text}
    </div>
  )
}

export default Button