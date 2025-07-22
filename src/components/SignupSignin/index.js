import React, { useState } from 'react';
import "./style.css";
import Input from '../Input';
import Button from '../Button';

function SignupSigninComponent() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  return (
    <div className="signup-wrapper">
      <h2 className="title">Sign-up on <span style={{ color: "blue" }}>MoneyVeu</span></h2>
      <form>
        <Input 
          label="Full Name" 
          state={name} 
          setState={setName} 
          placeholder="Your Name" 
        />

        <Input 
          label="Email" 
          state={email} 
          setState={setEmail} 
          placeholder="email@123" 
        />
        
        <Input 
          label="Password" 
          state={password} 
          setState={setPassword}
          type="password" 
          placeholder="say123" 
        />

        <Input 
          label="Confirm Password" 
          state={confirmPass} 
          setState={setConfirmPass} 
          type="password" 
          placeholder="say123" 
        />

        <Button text="Signup Using Email and Password" />
        <p style={{ textAlign: "center" }}>OR</p>
        <Button text="Signup Using Google" black={true} />
      </form>
    </div>
  );
}

export default SignupSigninComponent;
