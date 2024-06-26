import React from 'react'
import { NavLink } from 'react-router-dom'
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getCustomErrorMessage } from '../firebase/firebaseCustomErrorDictionary';

export default function SignIn() {

    const [userCredentials, setUserCredentials] = useState({});


    function handleCredentials(e){
        setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
        console.log(userCredentials);
    }

    function handleSignIn(){

        const signInpromise = signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .then((userCredential) => {
            console.log("sigined in");
            // Signed in 
            const user = userCredential.user;
            // ...
        })

        toast.promise(
            signInpromise,
            {
                loading: 'Signing In...',
                success: 'You are now Signed In',
                error: (error) => {
                    const errorCode = error.code;
                    const customMessage = getCustomErrorMessage(errorCode);
                    return <b>{customMessage}</b>;
                },
            }


        )
    }


  return (
    <div className='flex justify-center mt-[20vh]'>
        <div className=" h-[22rem] w-[25rem] bg-white bg-opacity-15 border-gray-500 border-2 rounded-xl p-5 flex items-center flex-col justify-center" >

            <h1 className='text-3xl font-bold text-white'>Sign In</h1>

            <div className='flex flex-col gap-4 mt-8'>
                
                <input className='h-10 w-80 rounded-xl bg-gray-500 bg-opacity-40 border border-gray-400 p-3 text-white outline-none' type="email" placeholder='Email' name='email'  onChange={(e)=>{handleCredentials(e)}} />

                <input className='h-10 w-80 rounded-xl bg-gray-500 bg-opacity-40 border border-gray-400 p-3 text-white outline-none' type="password" placeholder='Password' name='password' onChange={(e)=>{handleCredentials(e)}} />
            </div>
        
            <button className='bg-primary p-2 rounded-full px-4 font-bold mt-8' onClick={(e)=> {handleSignIn(e)}}>Sign In</button>
            <div className='flex text-[12px] mt-1 text-white'>
                <h4>
                    Don't have an account?
                </h4>
                <NavLink to="/Signup" className="text-primary ml-1">
                    Sign In
                </NavLink>
            </div>
           
        </div>
    </div>
  )
}
