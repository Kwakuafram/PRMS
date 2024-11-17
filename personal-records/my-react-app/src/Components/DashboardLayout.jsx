import React, { useState, useEffect } from "react";
// import DashboardPage from "../Pages/DashboardPage"; // You may want to update this to a property-related dashboard
import StudentList from "../Components/StudentList"; // New component to list tenants or students
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import TeacherList from "./TeacherList";
import PrintRecord from "./PrintRecord";

const DashboardLayout = () => {
  const [activeContent, setActiveContent] = useState("dashboard");
  const [userInitials, setUserInitials] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fullName = localStorage.getItem("name");

    if (fullName) {
      setUserName(fullName);
      const initials = fullName
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
      setUserInitials(initials);
    } else {
      console.error("User data missing in localStorage");
      toast.error("User data missing. Please log in again.");
      navigate("/");
    }
  }, [navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    toast.success("Logout successful");
    navigate("/");
    console.log("Logout");
  };

  const handleSidebarClick = (content) => {
    setActiveContent(content);
  };

  const renderContent = () => {
    switch (activeContent) {
      case "studentList":
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold">Student List</h1>
            <StudentList /> {/* Here, you will display your list of  students */}
          </div>
        );
        case "teacherlist":
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold">Teachers List</h1>
            <TeacherList /> {/* Here, you will display your list of teachers */}
          </div>
        );
        case "printrecords":
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold">Print Records</h1>
            <PrintRecord /> {/* Here, you will display your list of teachers */}
          </div>
        );
      default:
        return (
          <div className="p-3">
            <DashboardPage/>{/* <DashboardPage /> This is your default dashboard content */}
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-lg font-semibold flex gap-2 items-center justify-items-center">
          <span className=" text-center">ANSEC Personal Records</span>
          {/* <span className="text-center">Management System</span> */}
        </div>
        <nav className="flex-1 mt-16">
          <ul className="flex gap-5 p-4 flex-col">
            <li>
              <button
                onClick={() => handleSidebarClick("dashboard")}
                className={`block px-4 py-2 text-left w-full ${
                  activeContent === "dashboard"
                    ? "bg-blue-600 rounded-md"
                    : "hover:bg-gray-700 hover:rounded-md"
                } text-white`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSidebarClick("studentList")}
                className={`block px-4 py-2 text-left w-full ${
                  activeContent === "studentList"
                    ? "bg-blue-600 rounded-md"
                    : "hover:bg-gray-700 hover:rounded-md"
                } text-white`}
              >
                Student List {/* Renamed Tenants to Student List */}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSidebarClick("teacherlist")}
                className={`block px-4 py-2 text-left w-full ${
                  activeContent === "teacherlist"
                    ? "bg-blue-600 rounded-md"
                    : "hover:bg-gray-700 hover:rounded-md"
                } text-white`}
              >
                Teachers List {/* Renamed Tenants to Student List */}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSidebarClick("printrecords")}
                className={`block px-4 py-2 text-left w-full ${
                  activeContent === "printrecords"
                    ? "bg-blue-600 rounded-md"
                    : "hover:bg-gray-700 hover:rounded-md"
                } text-white`}
              >
                Print Records {/* print   Student List */}
              </button>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <main className="flex-1 h-screen">{renderContent()}</main>

        {/* User Profile */}
        <div className="p-4 bg-gray-100 border-t border-gray-300 flex items-center">
          <span
            id="name-initials"
            className="w-14 h-14 bg-blue-600 text-white rounded-full mr-4 flex items-center justify-center"
          >
            {userInitials}
          </span>
          <div>
            <div id="name" className="text-lg font-semibold">
              {userName}
            </div>
            <button onClick={""} className="text-blue-500 hover:underline mt-1">
              Manage Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
