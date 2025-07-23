import React, { useState } from "react";
import "./style.css"

const Input = ({ label, state, setState, type , placeholder }) => {

  return (
    <div className="input-wrapper">
      <label className="input-label" >{label}</label>
      <div>
        <input
          type={type}
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder={placeholder}
          className="input-field"
        />
      </div>
    </div>
  );
};

export default Input;
