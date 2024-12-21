import React, { useContext, useState, useEffect } from 'react'
import './Table.css'
import { SidebarContext } from '../ContextApi/SidebarProvider'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Table() {
  const [data, setData] = useState([]);
  const { expand } = useContext(SidebarContext)
   const [addList,setAddList]=useState(false)
  const toggleState=()=>setAddList(!addList)
  const navigate=useNavigate()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const[addDesc,setAddDesc]=useState([])
  const putdata=()=>{setAddDesc([description.trim()])}
   

  
  const api = 'http://localhost:3000';
  
  const fetchData = async () => {
    try {
      console.log("description>>>",description," >>>addDesc ",addDesc)
      const token = localStorage.getItem('token')
      const res = await axios.get(`${api}/getOne`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      console.log("data>>>> in table", res.data.listPopulate);
      setAddList(false)
      setData(res.data.listPopulate);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  
  useEffect(() => {
   
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      if (!title.length=== 0) {
      
        return;
      }
      const token = localStorage.getItem('token');
      await axios.post(`${api}/create`, { title,  descriptionList:addDesc }, {
        headers: { authorization: `Bearer ${token}` }
      });
      setDescription("")
      setTitle("")
      fetchData()
    } catch (error) {
      console.log("Error adding task:", error);
     
    }
  };

  return (
    <div>
      <div class className='table' style={{ left: expand ? '200px' : '20px' }}>
        <div className="table-content">
          <div className='table-card-heading'>
          <h4>Card</h4>  <h4>List</h4><h4>Lable</h4><h4>Members</h4><h4>Due date</h4>
          </div>
          <div className="card-data">
            <div className="table-card">
              {data.map((item) => (<div key={item._id}>
                  <div className='table-data-outer'> {item.descriptionList.map((cardItem, itemIndex) =>(
                    <div className='table-data'>
                    <h4 key={itemIndex}>{cardItem}</h4>
                    <div><h4>{item.taskId?.title}</h4></div>
                    <div><h4>. </h4></div>
                    <div><h4>...</h4></div>
                    <div><h4>.....</h4></div>
                  </div>))}
                  
                  
                  </div>
                  
       </div>))}
 </div>
</div>
        </div>
      <div className="create-list"><button onClick={toggleState}>+ Add</button></div>
      {addList && <div className='addList-card'>
       <div className="create-form">
           <h4>Add List</h4>
          <form onSubmit={handleSubmit}>
            <label htmlFor="form-list-name">Name</label>
            <input type="text" placeholder='card' id='form-list-name'  onChange={(e) => setDescription(e.target.value)}/>
           <label htmlFor="form-list-list">List</label>
          <input type="text" placeholder='list' id='form-list-list'  onChange={(e) => setTitle(e.target.value)}/>
          <div>
            <div className='startDate'>
              <label htmlFor="s-date">Start date</label>
              <input type="date" id='s-date' />
            </div>
            <div className='endDate'>
              <label htmlFor="e-date">End Date Time</label>
              <input type="date" name="" id="e-date" />
              <input type='time' />
            </div>
          </div>
          
          <button type='submit' onClick={putdata} >Add card</button>
          </form>
       </div>
        </div>}
      </div>
    </div>
  )
}

export default Table