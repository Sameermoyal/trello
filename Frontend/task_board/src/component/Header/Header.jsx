import React, { useContext, useEffect, useState } from 'react'
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
import f1 from "../../assets/f1.jpg"
import f2 from "../../assets/f2.jpg"
import f3 from "../../assets/f3.jpg"
import f4 from "../../assets/f4.jpg"
import axios from 'axios'
import { templateContext } from '../ContextApi/TemplateProvider';

function Header({ userLogin, expireDays }) {

  const [showCard, setShowCard] = useState(false)
  const { userEmail ,userName} = useContext(EmailContext)
  const navigate = useNavigate();
  const [expireTimer, setExpireTimer] = useState('false')
  const [timer, setTimer] = useState()
  const [templateDropDown, setTemplateDropDown] = useState(false)
  const {toggleTemplate} =useContext(templateContext)
  const toggleCard = () => {
    setShowCard(prev => !prev)
  }


  const [detailCard, setDetailCard] = useState(false)
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



  const setBackground = async (imageSrc) => {
    const token = localStorage.getItem('token');
    const api = 'http://localhost:3000';

    try {
      const response = await fetch(imageSrc);
      if (!response.ok) {
        throw new Error("Failed to fetch image");

      }

      const blob = await response.blob();
      const formData = new FormData();
      formData.append("image", blob)

      const uploadResponse = await axios.patch(`${api}/userTemplate`, formData,
        {
          headers: {
            authorization: `Bearer ${token}`,

          }
        }
      )
      console.log("Image uploaded successfully:")
      getTemplate();

    } catch (error) {
      console.log("error to update user template ", error)
    }
  }
  const getTemplate = async () => {
    const token = localStorage.getItem('token');
    const api = 'http://localhost:3000';
    console.log(" get api  call inside header ")
    try {
      const response = await axios.get(`${api}/getTemplateImage`,
        {
          headers: {
            authorization: `Bearer ${token}`,

          }
        }
      )
     console.log("template url >>>>",response.data.template);
     const imgUrl=response.data.template;
     toggleTemplate(imgUrl);
    } catch (error) {
      console.log("error to get template ", error)
    }

  }

  useEffect(() => {
    getTemplate()
  }, [])

  return (
    <div>
      <div className="header">
        <div className="header-left">
          <div><TbGridDots className='gridDots' /></div>
          <div className='logoName-web'><h2 className='logoName-web-heading'>Trello</h2></div>
          <div className='header-items'>
            <div className='header-item wokspace'><h4>Workspaces</h4></div>
            <div className='header-item recent'><h4>Recent</h4></div>
            <div className='header-item starer'><h4>Statrer</h4></div>
            <div className='header-item templates'><h4>Templates<IoIosArrowDown onClick={() => setTemplateDropDown((pre) => !pre)} /></h4></div>
          </div>
          <div className='more-link'><h3 >More</h3><IoIosArrowDown className='down-arrow' /></div>
          <div className='outer-add-item"'> <MdOutlineAddBox className="add-item" /> </div>
        </div>
        <div className="header-right">
          <button className='timerButton' onClick={togglePaymentCard} >{expireDays}days left</button>
          <div><FaSearch className="searchBar" /></div>
          <div >< TbBellRinging2 className="bellIconStyle" /></div>
          <div><FaQuestion className="questionMark" /></div>
          <BsThreeDotsVertical onClick={toggleCard} />
        </div>
        {showCard && (<div className="drop-down">
          <h1>{userName}</h1>
          <h1>{userEmail}</h1>
          <button onClick={userStatus}>logout</button>
          <button onClick={handleResetPassword}>resetPassword</button>
        </div>)}
        {detailCard && (<div className="drop-down-detail">

          <button className='plans' onClick={openPaymentPlan}>Plans</button>

        </div>)}
        {templateDropDown && <div className='templateCard'>
          <div className='templateCard-top' > <h5>Top templates</h5> </div>
          <div className="templateCard-card">
            <img width="200px" height="40px" src={f1} onClick={() => setBackground(f1)} />
            <img width="200px" height="40px" src={f2} onClick={() => setBackground(f2)} />
            <img width="200px" height="40px" src={f3} onClick={() => setBackground(f3)} />
            <img width="200px" height="40px" src={f4} onClick={() => setBackground(f4)} />

          </div>
          {/* <div className='templateCard-bottom' ><button>Explore More</button></div> */}

        </div>}
      </div>

    </div>
  )
}

export default Header