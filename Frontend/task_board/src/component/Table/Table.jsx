import React, { useContext, useEffect } from 'react'
import './Table.css'
import { SidebarContext } from '../ContextApi/SidebarProvider'

function Table() {
 const{expand}=useContext(SidebarContext)
  return (
    <div>
        <div class className='table' style={{left:expand?'200px':'20px'}}>
            Table
        </div>
    </div>
  )
}

export default Table