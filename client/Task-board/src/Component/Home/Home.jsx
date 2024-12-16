import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Home.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const api = 'http://localhost:3000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${api}/getAll`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        console.log("data>>>>", res.data.listPopulate);
        setData(res.data.listPopulate);
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
    <div className='home-page'>
      {data.map(listItem => {
        return (
          <div key={listItem._id} className='list' onDragOver={handleOnDragOver} onDrop={event => handleOnDrop(event, listItem._id, listItem.taskId._id)}>
            <div className='list-title'>
            <h1>{listItem.taskId?.title || "Un Titeled Task"}</h1>
            <button style={{ background: "green" }} onClick={() => { deleteTask(listItem.taskId._id) }} ><FontAwesomeIcon icon={faTrash} /></button>
                </div>

            <div className='list-description'>
              {listItem.descriptionList && listItem.descriptionList.length > 0 ? (
                listItem.descriptionList.map((description, descItem) => (
                  <h5 key={descItem} className="list-detail"
                    draggable
                    onDragStart={event => handleDragStart(event, { listId: listItem._id, descItem: descItem, taskId: listItem.taskId._id })}
                  >{description}</h5>
                ))
              ) : (
                <h5 className="list-detail" style={{ background: "red" }}>No description available</h5>
              )}

            </div>
          </div>
        )
      })}
      <div className='list' style={{ border: "2px solid transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Link to='/create'><button>+</button></Link>
      </div>
    </div>
  )
}

export default Home