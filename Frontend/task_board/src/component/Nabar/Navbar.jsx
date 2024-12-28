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

function Navbar() {
  const { expand } = useContext(SidebarContext)


  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["board", "table", "dashboard", "calender", "map"];

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
  }, [])

  'inside-link-tag'
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

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar