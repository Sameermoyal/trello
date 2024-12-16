import React, { useState,useEffect } from 'react';
// import "./Login.css";
import axios from 'axios';
import { Link } from "react-router-dom";


function Login({userLogin}) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
  

  const api='http://localhost:3000'
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !password) {
      setError("Both ID and Password are required.");
      return;
    }
    setError("");
  
    try {
      const userStatus = await axios.post(`${api}/login`, { id, password });
      console.log('userStatus>>>>>>',userStatus.data.token)
      const token=userStatus.data.token;
      localStorage.setItem('token',token) 
      userLogin(true); 
    } catch (error) {
        console.log("Error logging in:", error);
        setError("Login failed. Please check your credentials.");
      }
      

  };
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)}  placeholder="Enter your ID" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password"/>
        </div>
        <button type="submit">Login</button>
        <p>or</p>
       <Link to='signup' ><button>Sign Up</button></Link>
      </form>
    </div>
  );
}

export default Login;
