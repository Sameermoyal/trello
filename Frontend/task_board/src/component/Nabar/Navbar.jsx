import React from 'react'
import './navbar.css'
import { SidebarContext } from '../ContextApi/SidebarProvider'
import { useContext } from 'react'

function Navbar() {
    const {expand}=useContext(SidebarContext)
  return (
    <div>
        <div className="navbar" style={{left:expand ?'200px':'20px'}}>
            <div className='navbar-children'>
                <div className="navbar-heading"><h3>My Trello Board</h3></div>
                <div className="navbar-board">board</div>
                <div className="table">Table</div>
                <div className='dashBoard'>Dashboard</div>

            </div>
        </div>
    </div>
  )
}

export default Navbar