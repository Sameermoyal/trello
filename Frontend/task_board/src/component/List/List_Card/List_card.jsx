import React from 'react'
import "./List_card.css"
import { RxCross2 } from "react-icons/rx";


function List_card() {
  return (
    <div className='outer-list-card'>
        <div className='list-card' > 
            <div className='list-card-left'>left</div>
        
        
        <div className='list-card-right'>
        <button className='cross-button'><RxCross2 className='cross-logo' /></button>
        <div className="list-card-right-content">
            <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Join</h5></button>
            <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Members</h5></button>
            <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Labels</h5></button>
            <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Checklist</h5></button>
            <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Dates</h5></button>
            <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Attachment</h5></button>
            <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Location</h5></button>
            <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Cover</h5></button>
            <button className='list-card-right-content-button'><div className="list-card-right-content-button-logo"></div><h5>Custom Fields</h5></button>

        </div>
       
        
        
        </div>
    </div>
    </div>

   

  )
}

export default List_card

{/* <div className="list-drop-down" onClick={(e) => e.stopPropagation()}>
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
</div> */}