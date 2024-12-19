import React from 'react'
import './List.css'

function List({descItem,description,listItem}) {

    
  function handleDragStart(event, idObj) {
    const { descItem, listId, taskId } = idObj;
    // console.log("  listId: ", listId, "descItem: ", descItem, " taskId: ",taskId);
    event.dataTransfer.setData("text", JSON.stringify({ descItem, listId, taskId }))
  }

  return (
    <h5
    key={descItem} draggable onDragStart={(event) =>handleDragStart(event, { listId: listItem._id, descItem,  taskId: listItem.taskId._id,})}
    className="list-detail"
    style={{backgroundColor:listItem.listColor || 'white'}}  >
    {description}</h5>
  )
}

export default List