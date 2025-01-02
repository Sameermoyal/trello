import React, { useContext, useState ,useEffect} from 'react'
import './Dashboard.css'
import { SidebarContext } from '../ContextApi/SidebarProvider'
// import { PieChart } from 'react-minimal-pie-chart';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';

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

const taskLength=taskValue.reduce((acc,i)=>acc+i,0)

const  taskColor=resData.map(i=>i.listColor)
const  deadLineData=resData.map(i=>{return  i.deadline.length >0  ?  i.deadline :  null })  

const deadLineSplit= deadLineData.flat(2)
console.log("deadLineFlat>>",deadLineSplit)


const dueSoon = deadLineSplit.map((i) => {
  if (!i || !i.endTime) {
    return null; 
  }
  const endTimeMoment = moment(i.endTime);
  if (!endTimeMoment.isValid()) {
    return null; 
  }
  const now = moment();
  const duration = moment.duration(endTimeMoment.diff(now));
  return    duration >0 ? (duration.asDays() < 1 ? 1 : null) :null;
  
});

const dueSoonLength=dueSoon.reduce((acc, x) => acc + x, 0);
console.log("dueSoonLength",dueSoonLength)

const  overDue = deadLineSplit.map((i) => {
  if (!i || !i.endTime) {
    return null; 
  }
  const endTimeMoment = moment(i.endTime);
  if (!endTimeMoment.isValid()) {
    return null; 
  }
  const now = moment();
  const duration = moment.duration(endTimeMoment.diff(now));
  return    duration <0 ? (duration.asDays() < 1 ? 1 : 0) :0;
  
});

const overdueLength=overDue.reduce((acc, x) => acc + x, 0);


  console.log("overdueLength",overdueLength)    
         
          
const NoDateDueLength=Math.abs(taskLength-(Math.abs(overdueLength+dueSoonLength)))



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
  responsive: false, 
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        color: 'White', 
      },
      title: {
        display: true,
        text: 'Task Titles',
        color: 'white', 
        font: {
          size: 14, 
        },
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        color: 'white', 
      },
      
      title: {
        display: true,
        text: 'Task Count',
        color: 'white', 
        font: {
          size: 14, 
        },
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: 'purple', 
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
    data: [NoDateDueLength, dueSoonLength, overdueLength ],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const pieOption={
  responsive: false, 
  maintainAspectRatio: false,
}
  return (
    <div>
        {loading ? <p>Loading...</p> : (
      <div style={{ left: expand ? '200px' : '20px' }} className="dashboard">
       <div className='bar-chart'> <Bar data={barData} options={barOptions}  className='bar-graf'  height={500} width={400}/></div>
       <div className='pie-chart'> <Doughnut data={doughData}  options={pieOption} height={500} width={400}/></div>
      </div>
    )}
        
    </div>
  )
}

export default Dashboard