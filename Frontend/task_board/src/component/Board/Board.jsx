import React, { useContext, useRef, useEffect, useState } from "react";
import "./Board.css";
import { SidebarContext } from '../ContextApi/SidebarProvider'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { EmailContext } from '../ContextApi/UserEmailProvider'
import List from "../List/List";
import { BsThreeDots } from 'react-icons/bs'
import { MdDelete } from "react-icons/md";

function Board({ setExpireDays }) {
  const [data, setData] = useState([]);
  const { setUserEmail,setUserName } = useContext(EmailContext)
  const navigate = useNavigate();

  const { expand } = useContext(SidebarContext);
  const [taskDropDown, setTaskDropDown] = useState(false);
  const [addAnotherTask, setAddAnotherTask] = useState("")

  const [selectColor, setSelectColor] = useState('white')
  // const handleColorChange = (e) => { setSelectColor(e.target.value), console.log('Selected Color:', e.target.value) }

  const dropdownRef = useRef(null)
  const [visibleDropdown, setVisibleDropdown] = useState(null);

  const toggleCard = (taskId) => {
    setVisibleDropdown((prev) => (prev === taskId ? null : taskId));
  };

  const api = 'http://localhost:3000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${api}/getOne`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        console.log("data>>>>", res.data.listPopulate);
        console.log("endtime>>>>", res.data.endDate, res.data.is_premium);

        setData(res.data.listPopulate);
        setUserEmail(res.data.email);
        setUserName(res.data.name);
        setExpireDays(res.data.remainingDays)
        console.log('remainingDays', res.data.remainingDays)
      } catch (error) {
        console.log("Error fetching data", error);
      }



      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setVisibleDropdown(null);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    };
    fetchData()
  }, [setData])




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

  const handleButtonClick = async (e,task) => {

    const token = localStorage.getItem('token')
    const response = await axios.patch(`${api}/updateColorList`, { color:e.target.value, task }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    setData((preData) =>
      preData.map((item) =>

        item.taskId._id === task ? { ...item, listColor: response.data.updatedList.listColor } : item)
    )



  };

   const  handleColorChange=async (e, task) => {

    // console.log("task", color)
    const token = localStorage.getItem('token')
    const response = await axios.patch(`${api}/updateColorTask`, { color:e.target.value, task }, {
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

  const dropDownAddTask = (taskId) => {
    setTaskDropDown((prev) => (prev === taskId ? null : taskId));
  }

  const addTask = async (_id) => {

    try {
      const token = localStorage.getItem('token')

      const response = await axios.post(`${api}/addTaskList`, { addAnotherTask, _id }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      console.log(">>>new task add", response.data.list)
      const updatedList = response.data.list;
      setData((prevData) => prevData.map((listItem) => listItem._id === _id ? { ...listItem, descriptionList: updatedList } : listItem))

    } catch (error) {
      console.log("errro to get add task", error)
    }
  }

  return (
    <div>
      <div className="board" style={{ left: expand ? "200px" : "20px", }}>
        <div className="board-container">
          {data.map((listItem) => {
            const isCardVisible = visibleDropdown === listItem.taskId?._id;

            return (
              <div className="board-card" key={listItem._id} style={{ backgroundColor: listItem.taskId.taskColor || 'white' }}
                onDragOver={handleOnDragOver}
                onDrop={(event) =>
                  handleOnDrop(event, listItem._id, listItem.taskId._id)
                }>

                <div className="board-list-title">
                  <h1  >{listItem.taskId?.title || "Untitled Task"}</h1>
                  <div className="three-dots-board" onClick={() => toggleCard(listItem.taskId._id)}><BsThreeDots /></div>
                  {isCardVisible && <div ref={dropdownRef} className="isVisible-Card">
                    <div> <h4>List Action</h4></div>
                    <label htmlFor="desc-setColor"><h5>Set List Color</h5></label>
                    <div id="desc-setColor">
                      <input type="color" value={selectColor} onChange={(e)=>handleButtonClick (e,listItem.taskId._id)} />
                     
                    </div>
                    <label htmlFor="list-setColor"><h5>Set Task Color</h5></label>
                    <div id="list-setColor">
                      <input type="color" value={selectColor} onChange={(e)=>handleColorChange(e,listItem.taskId._id)} />
                     
                    </div>
                    <button className="delete-button" onClick={() => deleteTask(listItem.taskId._id)}>delete task <MdDelete /></button>

                  </div>}
                </div>

                <div className="list-description-parent">
                <div className="list-description">
                  {listItem.descriptionList.map((description, descItem) => <List description={description} descItem={descItem} listItem={listItem} setData={setData} data={data} />)}

                </div>
                </div>
                <button style={{ position: "absolute",left:"15px" , bottom: "15px", borderRadius: "5px", width: "40px", zIndex: "100"}} onClick={() => dropDownAddTask(listItem._id)}>Add</button>
                {taskDropDown === listItem._id && <div style={{ border: "1px solid black", borderRadius: "4px", width: "200px", height: "60px", position: "absolute", bottom: "30px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",backgroundColor:"whitesmoke" }}>
                  <input type="text" onChange={(e) => setAddAnotherTask(e.target.value)} />
                  <button onClick={() =>( addTask(listItem._id),setTaskDropDown(pre=>!pre))} >Add Card</button>
                </div>}
              </div>


            )

          })}
          <div className="create-card">
            <div className="create-button">
              <Link to="/create">
                <button>+ Add Another List</button>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Board;
