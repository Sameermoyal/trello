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
          <button className="expand-sidebar" onClick={toggelSidebar}>
            <FaArrowAltCircleRight />
          </button>
        )}
        {expand && (
          <div>
            <button className="collapse-sidebar" onClick={toggelSidebar}>
              <FaArrowAltCircleLeft />
            </button>
            <div>sidebar-content</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
