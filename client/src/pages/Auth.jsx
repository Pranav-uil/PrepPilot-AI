import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserdata } from '../redux/userSlice';

        function Auth({isModel = false}) {
            const dispatch = useDispatch()

        const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth,provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            // Axios is a JavaScript library used to send HTTP requests from your frontend (React) to your backend (Express.js) and receive responses
            const result = await axios.post(serverUrl + "/api/auth/google", {name, email}, {withCredentials:true})
           dispatch(setUserdata(result.data))
            
        } catch (error) {
            console.log(error)
             dispatch(setUserdata(null))
        }
    }

  return (
    <div className={`
      w-full 
      ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}
    `}>
      <motion.div
       initial={{opacity:0 , y:-200}} 
        animate={{opacity:1 , y:0}} 
        transition={{duration:1.05}}
       className={`
        w-full 
        ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
        bg-white shadow-2xl border border-gray-200
      `}>
        <div className='flex items-center justify-center gap-3 mb-6'>
    <div className='bg-black text-white p-2 rounded-lg'>
        <BsRobot size={18}/>
    </div>
    <h2 className='font-semibold text-lg'>PrepPilot.AI</h2>
</div>
   <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
                Continue With
                <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
                    <IoSparkles size={16}/>
                    AI Interview Coach

                </span>
            </h1>
               <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
               Sign in to access AI-driven mock interviews, monitor your progress, and gain valuable insights into your interview performance.
            </p>
               <motion.button 
                onClick={handleGoogleAuth} // onclick is event handler, which trigger on click button.
               whileHover={{opacity:0.9 , scale:1.05}}
            whileTap={{opacity:1 , scale:0.98}}
            className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md '>
                <FcGoogle size={20}/>
                Continue with Google

   
            </motion.button>
      </motion.div>
    </div>
  )
}

export default Auth