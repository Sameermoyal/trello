import React, { useState,useEffect } from 'react';
import "./Signup.css";
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';

function Signup({userLogin}) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const api='http://localhost:3000'

  const token=localStorage.getItem('token')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !password) {
      setError("Both ID and Password are required.");
      return;
    }
    setError("");
  
    try {
      const userStatus = await axios.post(`${api}/signup`, { id, password })
      userLogin(true); 
      navigate('/');
    } catch (error) {
        console.log("Error logging in:", error);
        setError("Signup failed. Please check your credentials.");
      }
      
  };
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)}  placeholder="Enter your ID" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password"/>
        </div>
        <button type="submit" >Signup</button>
        <p>or</p>
       <Link to='/'><button>Login</button></Link>
      </form>
    </div>
  );
}

export default Signup;
 