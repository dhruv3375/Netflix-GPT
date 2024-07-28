import React, { useEffect } from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { logo, SUPPORTED_LANGUAGES } from '../utils/constant';
import { userIcon } from '../utils/constant';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
  const handleSignOut = () => {
    signOut(auth).then(() => {}).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  };

  const handleGptSearchClick = () => {
    //toggle GPT SEARCH 
    //(we can do this by usinf local var(usestate) or we can use redux store)
    dispatch(toggleGptSearchView());
  }

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

const handleLanguageChange = (e) => {
 // console.log(e.target.value);
 dispatch(changeLanguage(e.target.value));

}
  return (
    <div className =" absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between"> 


        <img 
        className= "w-52" 
        src = {logo}
        alt = "Netflix Logo" 
        />
    {user && (
      <div className="flex p-4">
        {showGptSearch && (<select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key = {lang.identifier} value = {lang.identifier}>
              {lang.name}
            </option>
          ))}
        </select>)}
        <button onClick = {handleGptSearchClick}
         className='py-1 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg'>
          {showGptSearch ? "HomePage" : "GPT Search"}
          </button>
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