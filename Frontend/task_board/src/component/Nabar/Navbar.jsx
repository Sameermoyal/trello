import React, { useState, useContext, useEffect } from 'react'
import './navbar.css'
import { SidebarContext } from '../ContextApi/SidebarProvider'
import { FaStar } from "react-icons/fa";
import { MdOutlinePeopleOutline } from "react-icons/md"
import { MdOutlineSpaceDashboard } from "react-icons/md"
import { AiOutlineDashboard } from "react-icons/ai";
import { PiTableBold } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import axios from 'axios';
import { MdOutlineGroupAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function Navbar() {
  const { expand } = useContext(SidebarContext)
  const[shareButton,setShareButton]=useState(false)
   const[addEmail,setAddEmail]=useState("");
  //  const[addButton,setAddButton]=useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["board", "table", "dashboard", "calender", "map"];
  const[newMember,setNewMember]=useState([])
  const [navCheckBoxData, setNavCheckBoxData] = useState([]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const isChecked = (option) => selectedOptions.includes(option);

  const api = 'http://localhost:3000';



  const handleNavItem = async () => {
    try {

      const token = localStorage.getItem('token');
     const response= await axios.patch(`${api}/setting/navbarUpdate`, { navbarData: selectedOptions }, {
        headers: { authorization: `Bearer ${token}` }
      });
      getNavbarData()
    } catch (error) {
      console.log("Error to update navdata:", error);

    }

  }
  const getNavbarData = async () => {
    try {
      console.group("getNavbar working")
      const token = localStorage.getItem('token');
      const response = await axios.get(`${api}/setting/navbarGet`, {
        headers: { authorization: `Bearer ${token}` }
      });

      console.log(">>>res.data in navbar>>", response.data.navItems)
      setNavCheckBoxData(response.data.navItems);

    } catch (error) {
      console.log("Error get navbar:", error);

    }
  }
  useEffect(() => {

    getNavbarData();
    getNewMember();
  }, [])

  const getNewMember = async () => {
    try {
     
      const token = localStorage.getItem('token');
      const response = await axios.get(`${api}/getNewMember `, {
        headers: { authorization: `Bearer ${token}` }
      });

      setNewMember(response.data.memberName)
   console.log("response.data.memberName",response.data.memberName)
    } catch (error) {
      console.log("Error get navbar newMembar:", error);

    }
  } 
  'inside-link-tag'

const joinNewMember=()=>{
   try{
   const token =localStorage.getItem('token');
   axios.post(`${api}/joinNewMember`,{addEmail},{
    headers: { authorization: `Bearer ${token}` }
    
   })

   }catch(error){
    console.log("error to join new member",error)
   }
}

  return (
    <div>
      <div className="navbar" style={{ left: expand ? '200px' : '20px' }}>
        <div className='navbar-children'>
          <div className="navbar-children-left">
            <div className="navbar-heading"><h3>My Trello Board</h3></div>
            <div className="navbar-fav"><FaStar className='navbar-icon' /></div>
            <div className="peopleOutline"><MdOutlinePeopleOutline className='navbar-icon' /></div>
            <NavLink to='/' className={({ isActive }) => (isActive ? 'nav-item-active' : 'inside-link-tag')} ><div className="navbar-board"><MdOutlineSpaceDashboard className='navbar-icon' />board</div></NavLink>


            {navCheckBoxData &&
              navCheckBoxData.map((item, indexx) => (
                <NavLink
                  key={indexx}
                  to={`/${item}`}
                  className={({ isActive }) => (isActive ? 'nav-item-active' : 'inside-link-tag')}
                >
                  <div className="navbar-table">{item}</div>
                </NavLink>
              ))}



            {/* <PiTableBold className='navbar-icon'/> */}
            {/*<NavLink to='/calender' className={({isActive})=>(isActive ?'nav-item-active':'inside-link-tag')}><div className="navbar-clender">< FaCalendarAlt className='navbar-icon calender-icon'/>Calender</div></NavLink>
                <NavLink to='/dashboard' className={({isActive})=>(isActive ?'nav-item-active':'inside-link-tag')}><div className='navbar-dashBoard'><AiOutlineDashboard className='navbar-icon'/>Dashboard</div></NavLink>
                <NavLink to='/map' className={({isActive})=>(isActive ?'nav-item-active':'inside-link-tag')}><div className='navbar-dashBoard'><FaMapMarkerAlt  className='navbar-icon'/>Map</div></NavLink> */}

            <div className={({ isActive }) => (isActive ? 'nav-item-active' : 'inside-link-tag')} style={{ position: "relative" }}><div className='navbar-dashBoard'><FaAngleDown onClick={toggleDropdown} /></div>
              {isOpen && (
                <div className="dropdown-content" >
                  {options.map((option, ind) => (
                    <label
                      key={ind}
                      style={{
                        display: "block",
                        padding: "8px 10px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        value={option} disabled={option == 'board'}
                        checked={isChecked(option)}
                        onChange={() => handleCheckboxChange(option)}
                        style={{ marginRight: "8px" }}
                      />
                      {option}
                    </label>

                  ))}
                  <button onClick={handleNavItem}>set</button>

                </div>
              )}

            </div>
          </div>
          <div className="navbar-children-right">
               
               <div className='share-button-div'><button className='share-button' onClick={()=>setShareButton(pre=>!pre)}><MdOutlineGroupAdd  className='share-icon'/><h6>Share</h6></button>
               {shareButton && <div className='share-dropDown'>
                  <div className='share-dropDown-top'><h5>Share Board</h5><RxCross2 onClick={()=>setShareButton(pre=>!pre)}/> </div>
                  <div className='share-email'><input type="email" placeholder='Email address' onChange={(e)=>setAddEmail(e.target.value)} /> <button onClick={joinNewMember} >Share</button> </div>
                  <div><h5>Board Members</h5>
                     {newMember.map((i,ind)=><h6 key={ind}>{i}</h6>)}
                  </div>
                </div>}
               </div>
               
         
          </div>
           
        </div>
      </div>
    
    </div>
  )
}

export default Navbar