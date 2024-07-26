import React, { useState , useRef  } from 'react'
import Header from "./Header";
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword } from "firebase/auth";

import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { userIcon } from '../utils/constant';



const Login = () => {
    const [isSignInForm , setIsSignInForm] = useState(true);
    // we want to store the error message so we will create useState
    const [errorMessage , seterrorMessage] = useState(null);
    

    const dispatch = useDispatch();
    // useref is used to refrence 
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
         
    };
    const handleButtonClick = () => {
        //validate form data 
        //console.log(email.current.value);
        //console.log(password.current.value);

        const message = checkValidData(email.current.value , password.current.value);
        seterrorMessage(message); // if message returns NUll means no error 

        if(message) return;  //error --> dont go ahead

        //sign IN , sign Up logic
        if(!isSignInForm) {
          createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
           .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
              updateProfile(user, {
                displayName: name.current.value,
                photoURL : userIcon
              }).then(() => {
                // Profile updated!
                const {uid , email , displayName , photoURL} = auth.currentUser; // we cant wrie user bcoz we want updated value
                dispatch(addUser({uid : uid , email : email , displayName : displayName , photoURL : photoURL}));
              
              }).catch((error) => {
                // An error occurred
                seterrorMessage(error.message);
              });
             
              
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              seterrorMessage(errorCode + " -- "+ errorMessage);
              
            });

        }
        else {

          //sign In Logic 
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          
          
          
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
         
        
        });

        }

    }
  return <div>
    <Header />
    <div className= "absolute">
           <img src = "https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_large.jpg"
            alt = "bg-image" />
    </div>

    <form 
    onSubmit={(e) => e.preventDefault()} // so when you are clicking the sign in button it tries to submit the form so i want to stop it from submitting now , i dont want to submit the form
                                        
    className = "w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-75">
        <h1 className = "font-bold text-3xl py-4">
             {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && ( <input ref = {name} type="text" placeholder= " Full Name " className = " p-2 my-4 w-full bg-gray-800 bg-opacity-60" />)}
        <input 
        ref = {email}
        type="text" 
        placeholder= " Email Address " 
        className = " p-2 my-4 w-full bg-gray-800 bg-opacity-60" 
        />

        <input 
        ref={password}
        type="password" 
        placeholder= " Password " 
        className = " p-2 my-4 w-full bg-gray-800 bg-opacity-60" 
        />

        <p className="font-bold py-2 text-red-600">{errorMessage}</p>
        <button className = "p-3 my-5 bg-red-700 w-full rounded-lg"
        onClick={handleButtonClick}
        >
        {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className = "py-4   flex justify-center items-center cursor-pointer" onClick={toggleSignInForm}> 
        {isSignInForm ? "New to Netflix ? Sign Up" : "Already Registered ? Sign In Now."}
        </p>
    </form>
    
  </div>;
  
};

export default Login;