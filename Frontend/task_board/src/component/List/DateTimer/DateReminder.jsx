import React, { useEffect ,useRef, useState} from 'react'
import { RxCross2 } from "react-icons/rx";
import './DateReminder.css'
import moment from 'moment';
import axios from 'axios'

function DateReminder({ setDateCard ,listItem,descItem}) {
    const [starDate,setStartDate]=useState(null);
    const [endDate,setEndDate]=useState(null);
    const [endTime,setEndTime]=useState(null);
    const [reminder,setReminder]=useState(null);
    
  async function setReminderData(e) {
    try {
      console.log("endtime >>" ,endTime)
      console.log("endtime >>" ,typeof(starDate))
      console.log("endtime >>" ,typeof(reminder))
      
      console.log("endtime >>" ,typeof(endDate))

      console.log(typeof(endDate))
      e.preventDefault();
      console.log("form submitted")
      const token = localStorage.getItem('token')
      const response = await axios.patch("http://localhost:3000/deadline", 
       {  listId: listItem._id, descItem: descItem ,starDate:starDate, endDate:endDate,endTime:endTime,reminder:reminder},
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        });


     

    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div>
      {
        <div className='set-deadline-date'>

        <button className='cross-button'><RxCross2 className='cross-logo' onClick={() => setDateCard(prev => !prev)} /></button>
        <h6> Dates</h6>
        <form onSubmit={setReminderData} >
         <div>
         <label htmlFor="startDate">Start date</label>
         <input type="date"  id='startDate' onChange={(e)=>setStartDate(e.target.value)}/>
         </div>
         <div>
         <label htmlFor="enddate" >Due date</label>
          <input type="date" id='enddate' onChange={(e)=>setEndDate(e.target.value)} />
          
         </div>
         <div>
          <label htmlFor="endtime">End Time</label>
          <input type="time" name="" id="" onChange={(e)=>setEndTime(e.target.value)} />
         </div>
         
          <div class="dropdown">
            <div>
              <button>Set due date reminder</button>
              <div class="dropdown-content" >
               
                <label>
                  <input type="radio" name="dropdown" value="5 minutes before" onChange={(e)=>setReminder(e.target.value)} />
                  5 Minute before
                </label>
                <label>
                  <input type="radio" name="dropdown" value="1 hour before" onChange={(e)=>setReminder(e.target.value)} />
                  1 Hour Before
                </label>
                <label>
                  <input type="radio" name="dropdown" value="1 day before"  onChange={(e)=>setReminder(e.target.value)}/>
                  1 Day Before
                </label>
                <label>
                  <input type="radio" name="dropdown" value="2 day before"  onChange={(e)=>setReminder(e.target.value)}/>
                  2 Day Before
                </label>
              </div>
            </div>
          </div>

          
          <button type="submit">Save</button>
        

        </form>

      </div>}
    </div>
  )
}

export default DateReminder