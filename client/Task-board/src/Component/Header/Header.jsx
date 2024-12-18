import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import UserContext from '../UserContext/UserContext';
import { BsThreeDotsVertical } from "react-icons/bs";


function Header({ userLogin }) {
  const { userEmail } = useContext(UserContext);
  const [showCard, setShowCard] = useState(false); 
  

  const navigate = useNavigate();

  const userStatus = () => {
    userLogin(false);
  };
 
  const toggleCard = () => {
    setShowCard(!showCard);
  };

  const handleResetPassword=()=>{
  setShowCard(false)
  navigate('/resetPassword')
  }
 
  return (
    <div>
      <div className='header'>
        <div className="header-left">Welcome</div>
        <div className="header-right" onClick={toggleCard}>
          <BsThreeDotsVertical />
        </div>
        {showCard && (
        <div className="dropdown-card">
          <button onClick={userStatus}>Logout</button>
          <p>{userEmail}</p>
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}
      </div>
      
       
    </div>
  );
}

export default Header;
