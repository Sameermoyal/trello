import React, { useState, useContext } from 'react';
import "./Header.css";
import UserContext from '../UserContext/UserContext';
import { BsThreeDotsVertical } from "react-icons/bs";

function Header({ userLogin }) {
  const { userEmail } = useContext(UserContext);
  const [showCard, setShowCard] = useState(false); 

  const userStatus = () => {
    userLogin(false);
  };

  const toggleCard = () => {
    setShowCard(!showCard);
  };

  return (
    <div>
      <div className='header'>
        <div className="header-left">Welcome</div>
        <div className="header-right" onClick={toggleCard}>
          <BsThreeDotsVertical />
        </div>
      </div>
      {showCard && (
        <div className="dropdown-card">
          <button onClick={userStatus}>Logout</button>
          <p>{userEmail}</p>
          <p>Settings</p>
        </div>
      )}
    </div>
  );
}

export default Header;
