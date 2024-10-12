
import {  Navigate, Route, Routes } from"react-router-dom"
import './App.css';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Leads from "./components/Leads";
import Contacts from "./components/Contacts";
import DashboardMain from "./components/DashboardMain";
import Users from "./components/Users";
import ForgotPassword from "./components/ForgotPassword";
import CreateAccount from "./components/CreateAccount";
import ResetPassword from "./components/ResetPassword";

export const url="https://crm-backend-fuub.onrender.com" 





function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/account-registration" element={<CreateAccount/>} />
          <Route path="/reset-password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:id" element={<ResetPassword/>} />

          <Route path="/dashboard" element={<DashboardMain/>} />
          <Route path="/dashboard/leads" element={<Leads />} />
          <Route path="/dashboard/contacts" element={<Contacts />} /> 
          <Route path="/dashboard/users" element={<Users />} /> 
          <Route path="/*" element={<Navigate to="/"/>} /> 
        </Routes>
    </div>
  );
}


export default App;
