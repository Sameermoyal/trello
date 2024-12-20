import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import { EmailContext } from '../ContextApi/UserEmailProvider';
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbBellRinging2 } from "react-icons/tb";
import { FaQuestion } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { TbGridDots } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineAddBox } from "react-icons/md";

function Header({ userLogin ,expireDays}) {

  const [showCard, setShowCard] = useState(false)
  const { userEmail } = useContext(EmailContext)
  const navigate=useNavigate();
  const [expireTimer,setExpireTimer]=useState('false')
  const[timer,setTimer]=useState()
  
  const toggleCard = () => {
    setShowCard(prev => !prev)
  }
   

  const[detailCard,setDetailCard]=useState(false)
  const togglePaymentCard = () => {
    setDetailCard(prev => !prev)
  }

  const userStatus = () => {
    localStorage.removeItem('token'); 
    userLogin(false);
  };

  const handleResetPassword = () => {
    setShowCard(false);
    navigate('/resetPassword')
  }
  const openPaymentPlan = () => {
    setDetailCard(false); 
  
    navigate('/paymentplan')
  };

  return (
    <div>
      <div className="header">
        <div className="header-left">
          <div><TbGridDots className='gridDots'/></div>
          <div className='logoName-web'><h2 className='logoName-web-heading'>Trello</h2></div>
          <div className='more-link'><h3 >More</h3><IoIosArrowDown className='down-arrow'/></div>
           <div className='outer-add-item"'> <MdOutlineAddBox className="add-item"/> </div>
        </div>
        <div className="header-right">
          <button className='timerButton' onClick={ togglePaymentCard} >{expireDays}days left</button>
          <div><FaSearch  className="searchBar"/></div>
          <div >< TbBellRinging2 className="bellIconStyle"/></div>
          <div><FaQuestion className="questionMark"/></div>
          <BsThreeDotsVertical onClick={toggleCard} />
        </div>
        {showCard && (<div className="drop-down">
          <h1>{userEmail}</h1>
          <button onClick={userStatus}>logout</button>
          <button onClick={handleResetPassword}>resetPassword</button>
        </div>)}
       {detailCard && (<div className="drop-down-detail">
         
          <button className='plans' onClick={openPaymentPlan}>Plans</button>
        
        </div>)}
      </div>
      
    </div>
  )
}

export default Header