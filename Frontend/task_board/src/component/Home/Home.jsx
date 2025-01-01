import React, { useState ,useContext} from 'react';
import { Route, Routes,Navigate, useLocation } from 'react-router-dom';
import './Home.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Create from '../Create/Create';
import ResetPassword from '../ResetPassword/ResetPassword';
import Login from '../Login/Login';
import PaymentPlan from '../Premium/PaymentPlan';
import Board from '../Board/Board';
import Navbar from '../Nabar/Navbar';
import Table from '../Table/Table';
import Dashboard from '../Dashboard/Dashboard';
import Calenders from '../Calender/Calenders';
import Map from '../Map/Map';
import { templateContext } from '../ContextApi/TemplateProvider';
import Signup from "../Signup/Signup"

function Home() {
  const [expireDays, setExpireDays] = useState(true);
  const location = useLocation(); 
  const {templateUrl}=useContext(templateContext)

  const isLoginOrPaymentPlan = location.pathname === '/login' || location.pathname === '/paymentplan';
     //  if(!expireDays){
  //   return <PaymentPlan/>
  //  }
  return (
    <div className="home" style={{backgroundImage: templateUrl ? `url(${templateUrl})`:"null",backgroundSize:templateUrl ? "cover" :"null"}}>
    
      {!isLoginOrPaymentPlan && (
        <>
          <Header expireDays={expireDays}/>
          <Sidebar />
          <Navbar/>
        </>
      )}
      
      <Routes>
        <Route index element={<Board setExpireDays={setExpireDays} />} />
      
        <Route path="/create" element={<Create />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/paymentplan" element={<PaymentPlan />} />
        <Route path="/table" element={<Table />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calender" element={<Calenders />} />
        <Route path="/map" element={<Map />} />
        <Route path='*' element={<Navigate to='/' replace />} />     
      </Routes>
    </div>
  );
}

export default Home;




