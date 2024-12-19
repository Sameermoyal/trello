import React from 'react'
import Board from '../Board/Board'
import { Route,Routes } from 'react-router-dom'
import './Home.css'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Create from '../Create/Create'
import ResetPassword from '../ResetPassword/ResetPassword'
import Login from '../Login/Login'

function Home({ userLogin }) {
  return (
    <div className='home'>
        <Header  userLogin={userLogin}/>
        <Sidebar />
      <Routes>
       <Route path='/' element={<Board/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/create' element={<Create/>} />
       <Route path='/resetPassword' element={<ResetPassword/>} />
      </Routes>
    </div>
    
  )
}

export default Home