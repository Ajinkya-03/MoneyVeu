import React, { useState } from 'react';
import "./style.css";
import Input from '../Input';
import Button from '../Button';
import {createUserWithEmailAndPassword , signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth , db , provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { toast } from "react-toastify"; 
import { useNavigate } from "react-router";
function SignupSigninComponent() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm , setLoginForm] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);

    if (name !== "" && email !== "" && password !== "" && confirmPass !== "") {
      if (password === confirmPass) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPass("");
            createDoc(user); // toast and navigation handled in createDoc
          })
          .catch((error) => {
            toast.error(error.message);
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

  
  function loginUsingEmail() {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          toast.success("User Logged In");
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory");
    }
  }

  async function createDoc(user) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email: user.email,
          photoURL: photoURL ? photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Account Created!");
        setLoading(false);
        navigate("/dashboard");
      } catch (error) {
        toast.error(error.message);
        console.error("Error creating user document: ", error);
        setLoading(false);
      }
    } else 
      {
      setLoading(false);
      navigate("/dashboard");
    }
  }


  function googleAuth(){
      setLoading(true)

      try{

        signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        toast.success("User Succfully Authenticated")
        
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        toast.error("Login Error");
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

      }
      catch(e){toast.error(e.message)}
      
  }

  return (
    <>
    {loginForm ? (
      <div className="signup-wrapper">
      <h2 className="title">Login on <span style={{ color: "blue" }}>MoneyVeu</span></h2>
      <form>

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

        <Button  
        text="Login Using Email and Password"
        OnClick={loginUsingEmail}/>

        <p style={{ textAlign: "center" }}>OR</p>
        
        <Button OnClick={googleAuth} text="Login Using Google" black={true} />

        <p onClick={()=>setLoginForm(!loginForm)} style={{ textAlign: "center" ,cursor:"pointer" }}>
          Or don't have an account already? Click Here..</p>

      </form>
    </div>
    ) :
      (<div className="signup-wrapper">
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
        
        <Button OnClick={googleAuth} text="Signup Using Google" black={true} />

        <p onClick={()=>setLoginForm(!loginForm)} style={{ textAlign: "center" ,cursor:"pointer"}}>Or have an account already? Click Here..</p>
      </form>
    </div>) }
    
    </>
  );
}

export default SignupSigninComponent;
