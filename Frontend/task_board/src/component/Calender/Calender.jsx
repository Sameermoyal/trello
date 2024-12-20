import React, { useContext } from 'react'
import './Calender.css'
import Sidebar from '../Sidebar/Sidebar'
import { SidebarContext } from '../ContextApi/SidebarProvider'

function Calender() {
const{expand}=  useContext(SidebarContext)
  return (
    <div>
      <div className='calender' style={{left:expand?'200px':'20px'}}>
        Calender
        </div>
    </div>
  )
}

export default Calender



