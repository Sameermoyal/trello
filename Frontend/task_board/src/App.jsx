import React from 'react'
import Home from './component/Home/Home'
import Login from './component/Login/Login'
import Signup from './component/Signup/Signup'
import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import Authentication from "./component/ProtectedRoute/Authentication"

function App() {
  const [logedin,setLogedin]=useState(false)

 const userLogin =(arg)=>{
  setLogedin(arg)
 }
  
  
if(! logedin){
  
  return <div>
    <Routes>
      <Route path='/' element={<Login  setLogedin={setLogedin} />} />
      <Route path='/signup' element={<Signup userLogin={userLogin}/>}/>
    </Routes>
    </div>
  
} 

  return (
   <> <div className='app'>
    
    <Routes>
    <Route path='/login' element={<Login  setLogedin={setLogedin} />} />
      <Route path='/*' element={  <Authentication> <Home userLogin ={userLogin}/></Authentication>} />
    </Routes>

    </div> </>
    
  )
}

export default App