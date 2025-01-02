import React, { useContext, useState, useEffect, useRef } from 'react';
import './Calender.css';
import Sidebar from '../Sidebar/Sidebar';
import { SidebarContext } from '../ContextApi/SidebarProvider';
import axios from 'axios';
import { EventCalendar } from 'react-mui-event-calendar';
import moment from 'moment';

function Calenders() {
  const { expand } = useContext(SidebarContext);
  const [resData, setData] = useState([]); 
  const [dataSource, setDataSource] = useState([]); 

  const api = 'http://localhost:3000';
  
  const prevDeadLineSplitRef = useRef(); 

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${api}/getOne`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.listPopulate); 
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const deadLineData = resData.filter((i) => i.deadline.length > 0);

  const list = deadLineData.map((i) => {
    const filteredDescriptionsWithEndTime = i.descriptionList
      .map((descriptionItem, index) => {
        const matchingDeadline = i.deadline.find(
          (deadlineItem) => deadlineItem.index === index
        );

        if (matchingDeadline) {
          return {
            description: descriptionItem,
            endTime: matchingDeadline.endDate,
          };
        }
        return null;
      })
      .filter((item) => item !== null);

    return filteredDescriptionsWithEndTime;
  });

  const deadLineSplit = list.flat(2);
  
  
  useEffect(() => {
    if (deadLineSplit.length > 0 && JSON.stringify(deadLineSplit) !== JSON.stringify(prevDeadLineSplitRef.current)) {
      const updatedDataSource = deadLineSplit.map((i) => ({
        title: i.description,
        date: moment(i.endTime).toDate(),
      }));

      setDataSource(updatedDataSource);
      prevDeadLineSplitRef.current = deadLineSplit; 
    }
  }, [deadLineSplit]); 
  if (dataSource.length === 0) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <div className="calender" style={{ left: expand ? '200px' : '20px' }}>
        <div
          style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '3em 0',
          }}
        >
          <EventCalendar
            dataSource={dataSource} 
            pallet={{ primary: '#32d3a2', secondary: '#2343d3' }}
            onDataChange={(newEvents) => setDataSource(newEvents)} 
          />
        </div>
      </div>
    </div>
  );
}

export default Calenders;
