import React from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import BrowserRouter here
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from './Components/DashboardLayout';
import Login from './Components/Login';
import StudentList from './Components/StudentList';
import AdminSignup from './Components/Signup';
import TeacherList from './Components/TeacherList';
import PrintRecord from './Components/PrintRecord';
import StaffList from './Components/TeacherList';

const App = () => {
  return (
    <div>
      <ToastContainer /> {/* Toast notifications container */}

      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/" element={<Login />} />
        <Route path="/studentlist" element={<StudentList />} />
        <Route path="/teacherlist" element={<StaffList  />} />
        <Route path="/register" element={<AdminSignup />} />
        <Route path="/printrecords" element={<PrintRecord />} />



      </Routes>
    </div>
  );
};

export default App;
