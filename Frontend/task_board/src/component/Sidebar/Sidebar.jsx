import React, { useState,useContext } from "react";
import "./Sidebar.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { SidebarContext } from '../ContextApi/SidebarProvider'

function Sidebar() {
 const{expand,toggelSidebar}=useContext(SidebarContext)
 

 
  return (
    <div>
      <div className="sidebar">
        {!expand && (
          <div className="expand-sidebar" onClick={toggelSidebar}>
          
          <button><FaArrowAltCircleRight /></button>
          </div>
        )}
        {expand && (
          <div>
            <div className="collapse-sidebar" onClick={toggelSidebar}>
              <div className="sidebar-logo">
              <div className="inside-sidebar-logo"><h4>Trello Workspace</h4><p> premiun</p></div>
              <button>  < FaArrowAltCircleLeft /></button>
              </div>
            </div>
            <div className="sidebar-content">
             <div><h5>Board</h5></div>
             <div><h5>Member</h5></div>
             <div><h5>WorkSpace setting</h5></div>
             <div><h5>Workspace views</h5></div>
             <div><h5>table</h5></div>
             <div><h5>Calender</h5></div>
             
             <div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
