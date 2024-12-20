import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './Home.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Create from '../Create/Create';
import ResetPassword from '../ResetPassword/ResetPassword';
import Login from '../Login/Login';
import PaymentPlan from '../Premium/PaymentPlan';
import Board from '../Board/Board';
import Navbar from '../Nabar/Navbar';

function Home({ userLogin }) {
  const [expireDays, setExpireDays] = useState(true);
  const location = useLocation(); 
  

  const isLoginOrPaymentPlan = location.pathname === '/login' || location.pathname === '/paymentplan';
     //  if(!expireDays){
  //   return <PaymentPlan/>
  //  }
  return (
    <div className="home">
    
      {!isLoginOrPaymentPlan && (
        <>
          <Header userLogin={userLogin} expireDays={expireDays} />
          <Sidebar />
          <Navbar/>
        </>
      )}
      
      <Routes>
        <Route path="/" element={<Board setExpireDays={setExpireDays} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/paymentplan" element={<PaymentPlan />} />
      </Routes>
    </div>
  );
}

export default Home;




