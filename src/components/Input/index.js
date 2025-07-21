import React from 'react'
import "./style.css";

function Input({lable,state,setState,placeholder}) {
  return (
      <div className="input-wrapper">

      <p classNmae="lable-input">{lable}</p>
      <input 
      value={state} 
      placeholder={placeholder}
      onChange={(e)=> setState(e.target.value)}
      className="custom-input"/>
      </div>
  )
}

export default Input