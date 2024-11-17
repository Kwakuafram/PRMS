import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [houseFilter, setHouseFilter] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        fathers_name: '',
        house_number: '',
        mothers_name: '',
        contact: '',
        gender: '',
        status:'',
        dob:''
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        axios.get('http://192.168.0.3:8000/api/students')
            .then(response => {
                setStudents(Array.isArray(response.data) ? response.data : []);
                toast.success("Students loaded successfully.");
            })
            .catch(error => {
                console.error("Error fetching students:", error);
                setError("Failed to load student records.");
                setStudents([]);
                toast.error("Failed to load student records.");
            });
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleHouseFilter = (e) => {
        setHouseFilter(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            // Update student
            axios.put(`http://192.168.0.3:8000/api/students/${selectedStudent.id}`, formData)
                .then(() => {
                    fetchStudents();
                    resetForm();
                    toast.success("Student updated successfully.");
                })
                .catch(error => {
                    console.error("Error updating student:", error);
                    toast.error("Failed to update student.");
                });
        } else {
            // Add new student
            axios.post('http://192.168.0.3:8000/api/students', formData)
                .then(() => {
                    fetchStudents();
                    resetForm();
                    toast.success("Student added successfully.");
                })
                .catch(error => {
                    console.error("Error adding student:", error);
                    toast.error("Failed to add student.");
                });
        }
    };

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setFormData({
            name: student.name,
            fathers_name: student.fathers_name,
            house_number: student.house_number,
            mothers_name: student.mothers_name,
            contact: student.contact,
            gender: student.gender,
            status: student.status,
            dob: student.dob
        });
        setIsEditMode(true);
    };

    const handleView = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            fathers_name: '',
            house_number: '',
            mothers_name: '',
            contact: '',
            gender: '',
            status:'',
            dob:'',
        });
        setIsEditMode(false);
        setSelectedStudent(null);
    };

    const filteredStudents = students
        .filter(student => 
            student.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(student => 
            houseFilter === "" || student.house_number === houseFilter
        );

    const houseNumbers = [...new Set(students.map(student => student.house_number))];

    return (
        <div className="p-6">
            <ToastContainer />
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Student Records</h2>
            </div>

            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by student name"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-48 px-3 py-2 border hover:ring-2 hover:ring-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={houseFilter}
                    onChange={handleHouseFilter}
                    className="w-48 px-3 py-2 border   hover:ring-2 hover:ring-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Filter by House</option>
                    {houseNumbers.map((house, index) => (
                        <option key={index} value={house}>
                            House {house}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mb-8">
                <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg space-y-4">
                    <h3 className="text-xl font-bold">{isEditMode ? "Edit Student" : "Add Student"}</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-300 px-3 py-2 border rounded-lg focus:outline-none"
                        />
                        <input
                            type="text"
                            name="fathers_name"
                            placeholder="Father's Name"
                            value={formData.fathers_name}
                            onChange={handleInputChange}
                            required
                            className="w-full focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-300 px-3 py-2 border rounded-lg focus:outline-none"
                        />
                      
                        <select
                            name="house_number"
                            value={formData.house_number}
                            onChange={handleInputChange}
                            required
                            className="w-full focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-300 px-3 py-2 border rounded-lg focus:outline-none"
                        >
                            <option value="">Select house</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>

                        </select>
                        <input
                            type="text"
                            name="mothers_name"
                            placeholder="Mother's_name"
                            value={formData.mothers_name}
                            onChange={handleInputChange}
                          
                            className="w-full focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-300 px-3 py-2 border rounded-lg focus:outline-none"
                        />
                        <input
                            type="tel"
                            name="contact"
                            placeholder="Contact"
                            value={formData.contact}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-300 py-2 border rounded-lg focus:outline-none"
                        />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-300 py-2 border rounded-lg focus:outline-none"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-300 border rounded-lg focus:outline-none"
                        >
                            <option value="">Select Status</option>
                            <option value="Day">day</option>
                            <option value="Boarding">boarding</option>
                        </select>
                        <input
                            type="date"
                            name="dob"
                            placeholder="date_of_birth"
                            value={formData.dob}
                            onChange={handleInputChange}
                          
                            className="w-full px-3 py-2 hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 border rounded-lg focus:outline-none"
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                        {isEditMode ? "Update Student" : "Add Student"}
                    </button>
                    {isEditMode && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>
            <div className="overflow-auto max-h-96"> {/* Set a max height to enable vertical scrolling */}
    <div className="overflow-x-auto"> {/* Horizontal scrolling for table width */}
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
                <tr className="bg-gray-100 text-gray-700">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Father's Name</th>
                    <th className="py-3 px-6 text-left">House Number</th>
                    <th className="py-3 px-6 text-left">Mother's_name</th>
                    <th className="py-3 px-6 text-left">Contact</th>
                    <th className="py-3 px-6 text-left">Gender</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">date_of_birth</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredStudents.map(student => (
                    <tr key={student.id} className="border-b">
                        <td className="py-4 px-6">{student.name}</td>
                        <td className="py-4 px-6">{student.fathers_name}</td>
                        <td className="py-4 px-6">{student.house_number}</td>
                        <td className="py-4 px-6">{student.mothers_name}</td>
                        <td className="py-4 px-6">{student.contact}</td>
                        <td className="py-4 px-6">{student.gender}</td>
                        <td className="py-4 px-6">{student.status}</td>
                        <td className="py-4 px-6">{student.dob}</td>

                        <td className="py-4 px-6">
                            <button
                                onClick={() => handleEdit(student)}
                                className="mr-2 text-blue-500 hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleView(student)}
                                className="text-green-500 hover:underline"
                            >
                                View
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>


            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h3 className="text-lg font-semibold mb-4">Student Details</h3>
                        <p><strong>Name:</strong> {selectedStudent.name}</p>
                        <p><strong>Father's Name:</strong> {selectedStudent.fathers_name}</p>
                        <p><strong>House Number:</strong> {selectedStudent.house_number}</p>
                        <p><strong>Mother_Name:</strong> {selectedStudent.mothers_name}</p>
                        <p><strong>Contact:</strong> {selectedStudent.contact}</p>
                        <p><strong>Gender:</strong> {selectedStudent.gender}</p>
                        <p><strong>Status</strong> {selectedStudent.status}</p>
                        <p><strong>Date_Of_Birth:</strong> {selectedStudent.dob}</p>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentList;
