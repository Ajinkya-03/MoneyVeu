import React, { useState } from 'react';
import "./style.css";
import Input from '../Input';
import Button from '../Button';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify"; 

function SignupSigninComponent() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  function signupWithEmail() {
    setLoading(true);

    if (name !== "" && email !== "" && password !== "" && confirmPass !== "") {
      if (password === confirmPass) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            toast.success("User Created Successfully!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPass("");
          })
          .catch((error) => {
            toast.error(error.message); // Show actual error
            setLoading(false);
          });
      } else {
        toast.error("Password And Confirm Password Don't Match!");
        setLoading(false);
      }
    } else {
      toast.error("All Fields Are Required");
      setLoading(false);
    }
  }

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
          type="email"
          label="Email" 
          state={email} 
          setState={setEmail} 
          placeholder="email@123" 
        />
        
        <Input 
          type="password"
          label="Password" 
          state={password} 
          setState={setPassword} 
          placeholder="say123" 
        />

        <Input 
          type="password" 
          label="Confirm Password" 
          state={confirmPass} 
          setState={setConfirmPass} 
          placeholder="say123" 
        />

        <Button  
        text="Signup Using Email and Password"
        OnClick={signupWithEmail}/>

        <p style={{ textAlign: "center" }}>OR</p>
        
        <Button text="Signup Using Google" black={true} />
      </form>
    </div>
  );
}

export default SignupSigninComponent;
