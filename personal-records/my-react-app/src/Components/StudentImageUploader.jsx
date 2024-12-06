import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentImageUploader = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch students on component load
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/student_24")
      .then((response) => {
        setStudents(response.data);
        setFilteredStudents(response.data);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudent || !image) {
      setMessage("Please select a student and an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    axios
      .post(`http://localhost:8000/api/student_24/${selectedStudent}/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setMessage("Image uploaded successfully!");
        console.log(response.data);

        setTimeout(() => {
            window.location.reload();
          }, 1000);
      })
      .catch((error) => {
        setMessage("Failed to upload image.");
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Upload Student Images
        </h1>

        {/* Search Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Search Student:
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Type a name..."
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Student Selection */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Student:
            </label>
            <select
              onChange={(e) => setSelectedStudent(e.target.value)}
              value={selectedStudent || ""}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                -- Select a Student --
              </option>
              {filteredStudents.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Upload
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentImageUploader;
