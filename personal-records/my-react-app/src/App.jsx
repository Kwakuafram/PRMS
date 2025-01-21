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
import CoursesPage from './Components/CoursesPage';
import EnrollmentPage from './Components/EnrollmentPage';
import GradeEntryPage from './Components/GradeEntryPage.';
import SemesterReportsPage from './Components/SemesterReportsPage';
import TranscriptPage from './Components/TranscriptPage';
import StudentImageUploader from './Components/StudentImageUploader';
import ProtectedRoute from './Components/RrotectedRoute';

const App = () => {
  return (
    <div>
      <ToastContainer /> {/* Toast notifications container */}

      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
        <Route path="/" element={<Login />} />
        <Route path="/studentlist" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
        <Route path="/teacherlist" element={<ProtectedRoute><StaffList  /></ProtectedRoute>} />
        <Route path="/register" element={<AdminSignup />} />
        <Route path="/printrecords" element={<ProtectedRoute><PrintRecord /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
        <Route path="/enrollment" element={<ProtectedRoute><EnrollmentPage /></ProtectedRoute>} />
        <Route path="/gradeEntry" element={<ProtectedRoute><GradeEntryPage /></ProtectedRoute>} />
        <Route path="/semesterReports" element={<ProtectedRoute><SemesterReportsPage /></ProtectedRoute>} />
        <Route path="/transcripts" element={<ProtectedRoute><TranscriptPage /></ProtectedRoute>} />
        <Route path="/ImageUploader" element={<ProtectedRoute><StudentImageUploader/></ProtectedRoute>} />




      </Routes>
    </div>
  );
};

export default App;
