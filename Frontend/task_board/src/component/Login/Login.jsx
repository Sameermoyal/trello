import React, { useState,useEffect } from 'react';
// import "./Login.css";
import axios from 'axios';
import { Link ,useNavigate} from "react-router-dom";


function Login({setLogedin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[referralIdCode,setReferralIdCode]=useState("")
  const [error, setError] = useState("");
 const navigate=useNavigate()
  

  const api='http://localhost:3000'
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both ID and Password are required.");
      return;
    }
    setError("");
  
    try {
      const userStatus = await axios.post(`${api}/login`, { email, password ,referralIdCode});
      console.log('userStatus>>>>>>',userStatus.data.token)
      const token=userStatus.data.token;
      localStorage.setItem('token',token) 
      setLogedin(pre=>!pre)
      navigate('/')
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
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Refferal Code:</label>
          <input type="text" id="code" value={referralIdCode} onChange={(e) => setReferralIdCode(e.target.value)} placeholder="Enter your Refferal Code"/>
        </div>
        <button className='button'type="submit">Login</button>
        <p>or</p>
       <Link to='signup'><button className='button'>Sign Up</button></Link>
      </form>
    </div>
  );
}

export default Login;
