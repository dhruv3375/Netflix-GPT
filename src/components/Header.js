import React, { useEffect } from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { logo } from '../utils/constant';
import { userIcon } from '../utils/constant';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth).then(() => {}).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  };
   // we are using Use Effect bcoz i want to use onAuthStateChanged only once(at initial time)
   useEffect( () => {
       
        
    const unsubscribe =  onAuthStateChanged(auth, (user) => {
    if (user) {
       // if user sign in this party will be executed
        const {uid , email , displayName , photoURL} = user;
        dispatch(
            addUser({
                uid : uid , 
                email : email , 
                displayName : displayName,
                photoURL : photoURL
            }));
            navigate("/browse");
    } else {
        //if user sign out this part will be executed
        dispatch(removeUser());
        navigate("/");
        
    }
    });
    return () => unsubscribe();
} , []);
  return (
    <div className =" absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between"> 


        <img 
        className= "w-52" 
        src = {logo}
        alt = "Netflix Logo" 
        />
    {user && (
      <div className="flex p-4">
      <img
           className="w-12 h-12 pr-2"
           alt="usericon"
           src= {user?.photoURL}
         />
         <button onClick = {handleSignOut} className="font-bold text-white"> (Sign Out) </button>
   </div>
    )}
    
    </div>
    
  )
}

export default Header