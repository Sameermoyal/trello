import React, { useState,useContext } from 'react';
import axios from 'axios';
import './ResetPassword.css'; 
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext/UserContext';

function ResetPassword() {
  const api = 'http://localhost:3000'; 
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { userEmail } = useContext(UserContext);
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');
    setMessage('');

   
    if (newPassword === oldPassword) {
      setError('Passwords already match your previous password');
      return;
    }

    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        setError('You must be logged in to reset your password.');
        return;
      }

      console.log(">>>>>>>userEmail",userEmail)
      const res = await axios.patch(
        `${api}/resetPassword`,
        { oldPassword, newPassword ,userEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

    
      if (res.status === 200) {
        setMessage('Password reset successfully!');
        setNewPassword('');
        setOldPassword('');
        setTimeout(()=>navigate('/'),4000)
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while resetting the password.');
      console.error('Error--:', error);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Confirm your new password"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <button type="submit" className="submit-button">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
