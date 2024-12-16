import React from 'react'
import "./Header.css"

function Header({userLogin}) {
 
  const  userStatus=()=>{
    userLogin(false)
  }

  return (
    <div>
     <div className='header'>
        <div className="header-left">Welcome User</div>
        <div className="header-right"><button onClick={userStatus}>Logout</button></div>
     </div>

    </div>
  )
}

export default Header