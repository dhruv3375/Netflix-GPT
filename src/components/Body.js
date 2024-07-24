import { useEffect } from "react";
import Browse from "./Browse";
import  Login from "./Login";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase"; 
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";


const Body = () => {
    const dispatch = useDispatch();
    

    const appRouter = createBrowserRouter([
        {
            path : "/",
            element : <Login/>
        },
        {
            path : "/browse",
            element : <Browse/>
        },

    ]);
    // we are using Use Effect bcoz i want to use onAuthStateChanged only once(at initial time)
    useEffect( () => {
       
        
        onAuthStateChanged(auth, (user) => {
        if (user) {
           // if user sign in this party will be executed
            const {uid , email , displayName} = user;
            dispatch(addUser({uid : uid , email : email , displayName : displayName}));
            
            // ...
        } else {
            //if user sign out this part will be executed
            dispatch(removeUser());
            
        }
        });
    } , []);

    return (
    <div> 
       <RouterProvider router = {appRouter} />
    </div>
    );
};
export default Body