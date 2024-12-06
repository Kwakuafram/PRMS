import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [studentCount, setStudentCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logout successful');
    navigate('/');
  };

  // Fetch total student count
  const fetchStudentCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/studentCount'); // Replace with your API endpoint
      setStudentCount(response.data.count); // Assume the API returns { count: <number> }
    } catch (error) {
      console.error('Failed to fetch student count', error);
      toast.error('Could not load student data');
    }
  };

  useEffect(() => {
    fetchStudentCount();
  }, []);
  const fetchStaffCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/staffCount'); // Replace with your API endpoint
      setStaffCount(response.data.count); // Assume the API returns { count: <number> }
    } catch (error) {
      console.error('Failed to fetch staff count', error);
      toast.error('Could not load staff data');
    }
  };
  useEffect(() => {
    fetchStaffCount();
  }, []);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
    
      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-8">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold">Dashboard</div>
        </div>

        {/* Key Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-gray-700">Total Students</h3>
            <p className="text-3xl font-semibold text-gray-900">{studentCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-gray-700">Total Staff</h3>
            <p className="text-3xl font-semibold text-gray-900">{staffCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-gray-700">Upcoming Events</h3>
            <p className="text-xl text-gray-900">Parent-Teacher Meeting: Nov 15, 2024</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-gray-700">Total Courses</h3>
            <p className="text-3xl font-semibold text-gray-900">12</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Recent Student Registrations</h3>
          <ul>
            <li className="border-b py-2">John Doe - 10th Grade</li>
            <li className="border-b py-2">Jane Smith - 9th Grade</li>
            <li className="border-b py-2">Michael Lee - 12th Grade</li>
            {/* Add more items as needed */}
          </ul>
        </div>

        {/* Notifications/Alerts */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Notifications</h3>
          <ul>
            <li className="border-b py-2">Approve new student registration</li>
            <li className="border-b py-2">Update grades for the mid-term exams</li>
            <li className="border-b py-2">Reminder: Parent-Teacher Meeting on Nov 15</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
