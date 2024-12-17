import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import "./Home.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import UserContext from '../UserContext/UserContext'
import { BsThreeDotsVertical } from 'react-icons/bs'

function Home() {
  const [data, setData] = useState([]);
  const { setUserEmail } = useContext(UserContext)
  const navigate = useNavigate();
  const [visibleDropdown, setVisibleDropdown] = useState(null);

  const toggleCard = (taskId) => {
    setVisibleDropdown((prev) => (prev === taskId ? null : taskId));
  };

  

  const api = 'http://localhost:3000';

  const handleButtonClick = async(task,color) => {
   
     console.log("task",color)
    const token = localStorage.getItem('token')
    const response = await axios.patch(`${api}/updateColorList`,{color,task} ,{
      headers: {
        authorization: `Bearer ${token}`
      }
    });    

 setData((preData)=>
  preData.map((item)=>
    
  item.taskId._id===task ? {...item,listColor:response.data.updatedList.listColor}:item)
)
 
 
  };
  const handleTaskButtonClick = async(task,color) => {
   
     console.log("task",color)
    const token = localStorage.getItem('token')
    const response = await axios.patch(`${api}/updateColorTask`,{color,task} ,{
      headers: {
        authorization: `Bearer ${token}`
      }
    });    

    setData((prevData) =>
      prevData.map((item) =>
        item.taskId._id === task
          ? {
              ...item,
              taskId: {
                ...item.taskId,
                taskColor: response.data.updatedTask.taskColor, 
              },
            }
          : item
      ))
 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${api}/getOne`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        console.log("data>>>>", res.data.listPopulate, res.data.email);
        setData(res.data.listPopulate);
        setUserEmail(res.data.email)
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData()
  }, [])

  function handleDragStart(event, idObj) {
    const { descItem, listId, taskId } = idObj;
    // console.log("  listId: ", listId, "descItem: ", descItem, " taskId: ",taskId);
    event.dataTransfer.setData("text", JSON.stringify({ descItem, listId, taskId }))
  }

  function handleOnDragOver(e) {
    e.preventDefault();
  }

  function handleOnDrop(e, dropListId, dropTaskId) {
    e.preventDefault()
    const dropIds = { dropListId, dropTaskId }
    const getData = e.dataTransfer.getData('text')
    const dragIds = JSON.parse(getData)
    console.log("dragIds :", dragIds, "dropIds :", dropIds)
    dropUpdate()
    async function dropUpdate() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(`${api}/dndAdd`, { dropIds, dragIds }, { headers: { authorization: `Bearer ${token}` } });
        setData(response.data.listPopulate)
      } catch (error) {
        console.log("Error adding task:", error);
        setError("Adding updation failed.");
      }
    }
  }

  async function deleteTask(taskId) {
    try {
      console.log("delete api call")
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${api}/deleteTask/${taskId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log("afetr delete api call")
      setData((prevData) => prevData.filter((item) => item.taskId._id !== taskId));
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  }



  return (
    <div className="home-page">
      {data.map((listItem) => {
        const isDropdownVisible = visibleDropdown === listItem.taskId?._id;

        return (
          <div
            key={listItem._id}
            className="list"
            onDragOver={handleOnDragOver}
            onDrop={(event) =>
              handleOnDrop(event, listItem._id, listItem.taskId._id)
            }
          >
            <div style={{backgroundColor:listItem.taskId.taskColor || 'white' }}className="list-title">
              <h1  >{listItem.taskId?.title || "Untitled Task"}</h1>
              <div
                className="three-dots"
                onClick={() => toggleCard(listItem.taskId._id)}
              >
                <BsThreeDotsVertical />
              </div>
              
              {isDropdownVisible && (
                <div className="dropdown-card visible">
                    <button
                onClick={() => {
                  deleteTask(listItem.taskId._id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
                  <p> List Color</p>
                  <button onClick={()=>handleButtonClick(listItem.taskId._id,'#FF0000')} >red</button>
                  <button onClick={()=>handleButtonClick(listItem.taskId._id,'#219ebc')} >blue</button>
                  <button onClick={()=>handleButtonClick(listItem.taskId._id,'#2a9d8f')} >green</button>
                  <button onClick={()=>handleButtonClick(listItem.taskId._id,'#83c5be')} >lite green</button>
                
                  <p> Task Color</p>
                  <button onClick={()=>handleTaskButtonClick(listItem.taskId._id,'#FF0000')} >red</button>
                  <button onClick={()=>handleTaskButtonClick(listItem.taskId._id,'#219ebc')} >blue</button>
                  <button onClick={()=>handleTaskButtonClick(listItem.taskId._id,'#2a9d8f')} >green</button>
                  <button onClick={()=>handleTaskButtonClick(listItem.taskId._id,'#83c5be')} >lite green</button>
                </div>
              )}
            </div>
            <div className="list-description">
              {listItem.descriptionList && listItem.descriptionList.length > 0 ? (
                listItem.descriptionList.map((description, descItem) => (
                  <h5
                    key={descItem}
                    className="list-detail"draggable onDragStart={(event) =>handleDragStart(event, { listId: listItem._id, descItem,  taskId: listItem.taskId._id,})}
                    style={{backgroundColor:listItem.listColor || 'white'}}  >
                    {description}</h5>
                ))
              ) : (
                <h5
                  className="list-detail"
                  style={{ background: "red" }}
                >
                  No description available
                </h5>
              )}
            </div>
          </div>
        );
      })}
      <div
        className="list" style={{border: "2px solid transparent", display: "flex",alignItems: "center",justifyContent: "center",}}
      >
        <Link to="/create">
          <button>+</button>
        </Link>
      </div>
    </div>
  );
}

export default Home