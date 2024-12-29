import React,{useContext} from 'react'
import "./Map.css"
import { SidebarContext } from '../ContextApi/SidebarProvider'
import { FaMapMarkerAlt } from "react-icons/fa";

function Map() {
    const{expand}=  useContext(SidebarContext)
  return (
    <div>
         <div className='map' style={{left:expand?'200px':'20px'}}>
          
            <div style={{width:"100px",height:"100px"}}>
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.43602377802!2d75.625744603843!3d26.88542139078831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1735405366580!5m2!1sen!2sin" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

            </div>
                 </div>
    </div>
  )
}

export default Map