import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({}) {
  return isAuthenticated ? <Navigate to='/'/> :<Navigate to='/login'/>
}

export default ProtectedRoute