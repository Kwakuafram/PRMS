import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handleToggleConfirmPassword = () => {
    setConfirmPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (passwordInput !== confirmPasswordInput) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: passwordInput,
    };

    setIsLoading(true);

    try {
      const response = await api.post('http://localhost:8000/api/register', formData);
      toast.success("Signup successful!");
      navigate("/"); // Redirect to login page
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : "Signup failed: No response from server.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Register for PRMS</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={passwordType}
                id="password"
                name="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
              >
                {passwordType === 'password' ? 'Show' : 'Hide'}
              </button>
            </div>
          </div>
          {/* Confirm Password Field */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={confirmPasswordType}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleToggleConfirmPassword}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
              >
                {confirmPasswordType === 'password' ? 'Show' : 'Hide'}
              </button>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
