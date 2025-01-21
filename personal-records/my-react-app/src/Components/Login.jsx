import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/ANSEC.jpg"; // Adjust path if needed

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("id", data.user.id);

      toast.success("Admin login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

      {/* Animated School Name */}
      <div className="absolute top-16 text-white text-4xl font-bold animate-slideIn">
        <h1>ANTOA SENIOR HIGH SCHOOL PRMS</h1>
      </div>

      <div className="relative w-full max-w-md bg-white p-8 rounded-lg shadow-md z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/admin/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;