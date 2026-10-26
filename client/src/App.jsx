import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserdata } from './redux/userSlice.js'
export const serverUrl = "http://localhost:8000"
function App() {
  const dispatch = useDispatch()
  useEffect (() => {
    const getUser = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/user/current-user", {withCredentials:true})
        dispatch(setUserdata(result.data))
        
      } catch (error) {
        console.log(error);
        dispatch(setUserdata(null))
      }
    }

    getUser()
  }, [dispatch])
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
  )
}

export default App