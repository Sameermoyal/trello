import React,{useEffect} from 'react'
import {useNavigate,Navigate} from 'react-router-dom'

function Authentication({children}) {
  const token = localStorage.getItem('token');
  const navigate=useNavigate()
  if (!token) {
  return <Navigate to="/login" />
}

  
  return children  ;
}

export default Authentication