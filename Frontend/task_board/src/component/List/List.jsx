import React, { useState } from 'react';
import './List.css';
import axios from 'axios';


function List({ descItem, description, listItem }) {
  const [dropDoen, setDropDown] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [endingTime,setEndingTime]=useState(null)


 const deadlines=(e)=>{setEndingTime(e.target.value),setDedline()}
 
 async function setDedline(){
  try {
    const token = localStorage.getItem('token')
    const response = await axios.post("http://localhost:3000/deadline",{deadline:endingTime,listId:listItem._id},

    {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

  } catch (error) {
    console.error(error);
  }
 }

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
   console.log("formData",formData)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post("http://localhost:3000/uploadFile",formData,
  
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const result =response.data.imageurl;
      console.log("result",)
      if (response.ok) {
        setMessage(result.message);
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
    <div
      onClick={() => setDropDown(!dropDoen)}
      key={descItem}
      draggable
      onDragStart={(event) =>
        handleDragStart(event, {
          listId: listItem._id,
          descItem,
          taskId: listItem.taskId._id,
        })
      }
      className="list-detail"
      style={{ backgroundColor: listItem.listColor || 'white' }}
    >
      <h5>{description}</h5>

      {dropDoen && <div className="list-drop-down" onClick={(e) => e.stopPropagation()}>
<h2>Upload File</h2>
<form onSubmit={handleSubmit}>
  <input type="file" onChange={handleFileChange} />
  <button type="submit">File Attach</button>
  <div>{listItem.files.map(i=>  <a href={i.url} download={i.name} style={{pedding:'2px'}}>img</a> )}</div>
<div>
  <h4>Set Ending Time</h4>
  <input type="datetime-local" onChange={deadlines} />
</div>

</form>
</div>}
      
    </div>
  );
}

export default List;
