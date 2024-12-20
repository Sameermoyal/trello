import React from 'react'
import './navbar.css'
import { SidebarContext } from '../ContextApi/SidebarProvider'
import { useContext } from 'react'
import { FaStar } from "react-icons/fa";
import { MdOutlinePeopleOutline } from "react-icons/md"
import { MdOutlineSpaceDashboard } from "react-icons/md"
import { AiOutlineDashboard } from "react-icons/ai";
import { PiTableBold } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Navbar() {
    const {expand}=useContext(SidebarContext)
  return (
    <div>
        <div className="navbar" style={{left:expand ?'200px':'20px'}}>
            <div className='navbar-children'>
               <div className="navbar-children-left">
               <div className="navbar-heading"><h3>My Trello Board</h3></div>
                <div className="navbar-fav"><FaStar className='navbar-icon'/></div>
                <div className="peopleOutline"><MdOutlinePeopleOutline className='navbar-icon'/></div>
                <Link to='/' className='inside-link-tag'><div className="navbar-board"><MdOutlineSpaceDashboard className='navbar-icon'/>board</div></Link>
                <Link to='/table' className='inside-link-tag'><div className="navbar-table"><PiTableBold className='navbar-icon'/>Table </div></Link>
                <Link to='/calender' className='inside-link-tag'><div className="navbar-clender">< FaCalendarAlt className='navbar-icon calender-icon'/>Calender</div></Link>
                <Link to='/dashboard'className='inside-link-tag'><div className='navbar-dashBoard'><AiOutlineDashboard className='navbar-icon'/>Dashboard</div></Link>
              </div>
              <div className="navbar-children-right">

              </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar