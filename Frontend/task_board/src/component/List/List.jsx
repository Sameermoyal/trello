import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import moment from 'moment';
import { RxCross2 } from "react-icons/rx";
import List_card from './List_Card/List_card';
import DateReminder from './DateTimer/DateReminder';


function List({ descItem, description, listItem, setData, data }) {
  const [dropDoen, setDropDown] = useState(false);
  const [file, setFile] = useState(null);
  const [endingTime, setEndingTime] = useState(null)
  const [countDown, setCountdown] = useState(false);
  const deadlineChange = (e) => { setEndingTime(e.target.value) }
  const [taskId, setTaskId] = useState(false);
  const [dateCard, setDateCard] = useState(false)
  const [attachCard, setAttachCard] = useState(false)
 const [index,setIndex]=useState(false);


  async function setDedline(e) {
    try {
      e.preventDefault();
      const token = localStorage.getItem('token')
      const response = await axios.post("http://localhost:3000/deadline", { deadline: endingTime, listId: listItem._id, descItem: descItem },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        });


      setEndingTime(null)

    } catch (error) {
      console.error(error);
    }

  }



  useEffect(() => {
    const interval = setInterval(() => {
    
  
       if (listItem.deadline) {
        
        const reminderArr=listItem.deadline.map((i)=>i)
       
        reminderArr.map((item)=>{
          const now = moment();
          const endTimeMoment = moment(item.endTime);
          const startDateMoment =moment(item.startDate)
          const duration = moment.duration(endTimeMoment.diff(now));
  
          if (duration.asDays() < 1) {
              
            setCountdown(
              `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`
            );
  
            setIndex(item.index)
          } else {
            setCountdown('');
          }
        })
        
      }
    }, 1000);

     return () => clearInterval(interval);
  }, [listItem.deadline]);



  function handleDragStart(event, idObj) {
    const { descItem, listId, taskId } = idObj;
    event.dataTransfer.setData("text", JSON.stringify({ descItem, listId, taskId }));
  }

  const handleFileChange = (event) => {
    event.stopPropagation();
    setFile(event.target.files[0]);
    console.log("file>>", event.target.files[0]);
   
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("listItem", JSON.stringify(listItem));
    formData.append("descItem", descItem)
    console.log("formData", formData)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch("http://localhost:3000/uploadFile", formData,

        {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

      const result = response.data.imageurl;
      console.log("result",)
      if (response.status === 200) {
        setMessage("File uploaded successfully.");


        const updatedFiles = [...listItem.files, { url: result, name: file.name, imgPosition: descItem }];
        const updatedListItem = { ...listItem, files: updatedFiles };


        setData((prevData) =>
          prevData.map((item) =>
            item._id === listItem._id ? updatedListItem : item
          )
        );


      } else {
        setMessage(result.message || "File upload failed.");
      }
    } catch (error) {
      setMessage("An error occurred while uploading the file.");
      console.error(error);
    }


    setDropDown(false);
  };

  return (
    <div onClick={() => setDropDown(!dropDoen)} key={descItem} draggable onDragStart={(event) => handleDragStart(event, { listId: listItem._id, descItem, taskId: listItem.taskId._id, })}
      className="list-detail"
      style={{ backgroundColor: listItem.listColor ,margin:"20px" }}
    >
      <h5>{description} </h5>
      <div>{index===descItem && <span style={{ color: 'green', backgroundColor:"yellow", margin: '20px' }}>{countDown}</span>}</div>


      {dropDoen && <div className='outer-list-card' onClick={(e) => e.stopPropagation()}>
        <div className='list-card' >
          <div className='list-card-left'>left</div>


          <div className='list-card-right'>
            <button className='cross-button'><RxCross2 className='cross-logo' onClick={() => setDropDown(prev => !prev)} /></button>
            <div className="list-card-right-content">
              <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Join</h5></button>
              <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Members</h5></button>
              <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Labels</h5></button>
              <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Checklist</h5></button>
              <button className='list-card-right-content-button' onClick={() => setDateCard(!dateCard)}><div className="list-card-right-content-button-logo"></div>
                <h5>Dates</h5></button>
              <button className='list-card-right-content-button' onClick={() => setAttachCard(!attachCard)}><div className="list-card-right-content-button-logo"></div><h5>Attachment</h5></button>
              <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Location</h5></button>
              <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Cover</h5></button>
              <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Custom Fields</h5></button>

            </div>
            {attachCard && <div className='set-attachment'>
              <button className='cross-button'><RxCross2 className='cross-logo' onClick={() => setAttachCard(prev => !prev)} /></button>

              <h1>Attach</h1>
              <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">File Attach</button>
              </form>

              <div>{listItem.files.map(i =>
                i.imgPosition === descItem ? (<a href={i.url} download style={{ pedding: '2px' }}>{i.name}</a>) : null)
              }</div>
              </div>}
              {dateCard && <DateReminder setDateCard={setDateCard} listItem={listItem} descItem={descItem}/>}
            </div>

        </div>

        </div>
      }




      </div>


  );
}

      export default List;



      {/* {dropDoen && <div className="list-drop-down" onClick={(e) => e.stopPropagation()}>
        <h2>Upload File</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">File Attach</button>
        </form>
        <div>{listItem.files.map(i =>
          i.imgPosition === descItem ? (<a href={i.url} download style={{ pedding: '2px' }}>{i.name}</a>) : null)
        }

        </div>


        <div>
          <form onSubmit={setDedline}>
            <h4>Set Ending Time</h4>
            <input type="datetime-local" onChange={deadlineChange} />
            <button>reminder</button>
          </form>
        </div>


      </div>} */}