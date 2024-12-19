 const api = 'http://localhost:3000';

const   handleOnDrop=(e, dropListId, dropTaskId) =>{
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


  export {handleOnDrop}