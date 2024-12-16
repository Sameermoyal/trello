import React, { useState } from 'react'
import Home from './Component/Home/Home'
import Login from './Component/Login/Login'
import Signup from './Component/Signup/Signup'
import { Routes,Route } from 'react-router-dom'
import Create from "./Component/Create/Create"
import Header from "./Component/Header/Header"


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
    <div>
      <Header userLogin={userLogin}/>
      
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/create' element={<Create/>} />
   </Routes>
   

    </div>
  )
}

export default App