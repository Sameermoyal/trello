import React, { useContext, useState } from 'react'
import './Dashboard.css'
import { SidebarContext } from '../ContextApi/SidebarProvider'

function Dashboard() {
  const {expand}= useContext(SidebarContext)
  return (
    <div>
        <div style={{left:expand ?'200px':'20px'}} className='dashboard'>
        Dashboard
        </div>
    </div>
  )
}

export default Dashboard