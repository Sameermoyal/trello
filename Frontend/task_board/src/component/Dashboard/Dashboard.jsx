import React, { useContext, useState ,useEffect} from 'react'
import './Dashboard.css'
import { SidebarContext } from '../ContextApi/SidebarProvider'
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

function Dashboard() {
  const {expand}= useContext(SidebarContext)
 const [resData, setData] = useState([]);
 
 const api = 'http://localhost:3000';
 
 const fetchData = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${api}/getOne`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    console.log("data>>>>", res.data.listPopulate);
   
   
    setData(res.data.listPopulate);
   
    console.log('remainingDays',res.data.listPopulate)
  } catch (error) {
    console.log("Error fetching data", error);
  }


};

 useEffect(() => {

  fetchData()
}, [])

const apiData = resData.map(i => {
  return {
    title: i.taskId?.title || "Untitled Task", 
    value: i.descriptionList?.length || 0,   
    color: i.taskId?.taskColor || "#000000"  
  };
});



console.log(">>>>>>apidata",apiData)

  return (
    <div>
        <div style={{left:expand ?'200px':'20px'}} className='dashboard'>
        <PieChart
  data={apiData}
/>;

        </div>
    </div>
  )
}

export default Dashboard