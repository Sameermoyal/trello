import React from 'react'
import Home from './component/Home/Home'
import Login from './component/Login/Login'
import Signup from './component/Signup/Signup'
import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import './App.css'


function App() {
  const [logedin,setLogedin]=useState(false)

 const userLogin =(arg)=>{
  setLogedin(arg)
 }
  
  
if(! logedin){
  
  return <div><Routes>
      <Route path='/' element={<Login userLogin={userLogin}/>}/>
      <Route path='/signup' element={<Signup userLogin={userLogin}/>}/>
    </Routes></div>
  
} 

  return (
   <> <div className='app'>
    <Home userLogin={userLogin}/>
    </div> </>
    
  )
}

export default App