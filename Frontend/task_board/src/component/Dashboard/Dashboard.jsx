import React, { useContext, useState ,useEffect} from 'react'
import './Dashboard.css'
import { SidebarContext } from '../ContextApi/SidebarProvider'
// import { PieChart } from 'react-minimal-pie-chart';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function Dashboard() {
  const {expand}= useContext(SidebarContext)
 const [resData, setData] = useState([]);
 const [loading, setLoading] = useState(true);
 const api = 'http://localhost:3000';
 
 const fetchData = async () => {
  try {
    setLoading(true);
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
  }finally {
    setLoading(false);
  }


};

 useEffect(() => {

  fetchData()
}, [])

const title = resData.map(i => i.taskId?.title || "Untitled Task");

const taskValue=resData.map(i=>i.descriptionList.length)
const  taskColor=resData.map(i=>i.listColor)
   
console.log("taskValue",taskValue)


const generateColors = (length) =>
  Array.from({ length }, () =>
    `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
  );



const barData = {
  labels: [...title],
  datasets: [
      {
          label: 'Task per List',
          data: [...taskValue],
          backgroundColor: [...taskColor] ,
          borderWidth: 1,
      },
  ],
};


const barOptions = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1, 
      },
    },
  },
};

const doughData = {
  labels: [
    'No Date Due',
    'Due soon',
    'Overdue'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

  return (
    <div>
        {loading ? <p>Loading...</p> : (
      <div style={{ left: expand ? '200px' : '20px' }} className="dashboard">
       <div className='bar-chart'> <Bar data={barData} options={barOptions}  className='bar-graf' /></div>
       <div className='pie-chart'> <Doughnut data={doughData} /></div>
      </div>
    )}
        
    </div>
  )
}

export default Dashboard