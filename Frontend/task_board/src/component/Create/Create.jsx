import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Create.css";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const api = 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || description.length === 0) {
      setError("Both title and at least one description are required.");
      return;
    }
    setError("");
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${api}/create`, { title,  descriptionList:description }, {
        headers: { authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (error) {
      console.log("Error adding task:", error);
      setError("Adding new task failed.");
    }
  };

  const handleAddDescription = () => {
    if (newDescription.trim() !== "") {
      setDescription([...description, newDescription.trim()]);
      setNewDescription("");
    }
  };

  return (
    <div className="create-container">
      <form onSubmit={handleSubmit}>
        <h1>Create Task</h1>
        {error && <p className="error">{error}</p>}

        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Enter the title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="newDesc">Description:</label>
          <input
            type="text"
            id="newDesc"
            value={newDescription}
            placeholder="Add a description"
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button type="button" onClick={handleAddDescription}>Add</button>
        </div>
          

        <ul>
          {description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>

        <button type="submit">ADD List</button>
      </form>
    </div>
  );
}

export default Create;
