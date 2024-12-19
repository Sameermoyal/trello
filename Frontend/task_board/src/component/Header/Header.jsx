import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import { EmailContext } from '../ContextApi/UserEmailProvider';
import { BsThreeDotsVertical } from "react-icons/bs";


function Header({ userLogin }) {
  const [showCard, setShowCard] = useState(false)

  const { userEmail } = useContext(EmailContext)
  const navigate=useNavigate();
  const toggleCard = () => {
    setShowCard(prev => !prev)
  }

  const userStatus = () => {
    localStorage.removeItem('token'); 
    userLogin(false);
  };

  const handleResetPassword = () => {
    setShowCard(false);
    navigate('/resetPassword')
  }

  return (
    <div>
      <div className="header">
        <div className="header-left">Welcome</div>
        <div className="header-right">
          <BsThreeDotsVertical onClick={toggleCard} />
        </div>
        {showCard && (<div className="drop-down">
          <h1>{userEmail}</h1>
          <button onClick={userStatus}>logout</button>
          <button onClick={handleResetPassword}>resetPassword</button>
        </div>)}

      </div>
    </div>
  )
}

export default Header