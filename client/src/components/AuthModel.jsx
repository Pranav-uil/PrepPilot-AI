import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/auth';

function AuthModel({onClose}) {
    const {userData} = useSelector((state)=>state.user)

    useEffect(()=>{
        if(userData){
            // Calling onClose() tells the parent to close this modal.
            onClose()
        }

    },[userData , onClose]) 

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/20 backdrop-blur-sm px-4'>
        <div className='relative w-full max-w-md'>
            <button onClick={onClose} className='absolute top-8 right-5 text-gray-800 hover:text-black text-xl'>
             <FaTimes size={18}/>
            </button>
            {/* Yes! We are rendering (calling) the Auth component in Auth.jsx here: where we pass a prop named isModel with the Boolean value true. */}
            <Auth isModel={true}/>


        </div>

      
    </div>
  )
}

export default AuthModel

{/* <Auth isModel={true}/>
    <Auth /> — displays your existing Auth page, which contains your login/signup UI.
isModel={true} — sends a value called isModel to that Auth.jsx. Its value is true.

isModel={true} → The login form opens inside a popup.
isModel={false} → The login form opens on a separate, full page. */}