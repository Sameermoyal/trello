import React from 'react'
import Home from '../src/component/Home/Home'
import Login from '../src/component/Login/Login'
import Signup from '../src/component/Signup/Signup'
import { Route,Routes ,Navigate} from 'react-router-dom'
import './App.css'


function App() {
  const isAuth=()=>{
    return localStorage.getItem('token') ? "true" : "false";
  }

 const ProtectedRoute=({children})=>{
  return  isAuth() === "true" ? children  : <Navigate to='/login' />
 }
  return (
   <> <div className='app'>
    
    <Routes>
    <Route path='/login' element={<Login/>} />
    <Route path='/signup' element={<Signup/>}/>
    <Route path="/*" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
    </Routes>

    </div> </>
    
  )
}

export default App