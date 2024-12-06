import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StaffList = () => {
    const [Staffs, setStaffs] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [formData, setFormData] = useState({
        full_name: '',
        sex: '',
        staff_id: '',
        dob: '',
        first_pay_allowance: '',
        social_security: '',
        ghana_card: '',
        category: '',
        rank_grade: '',
        date_placed_on_rank: '',
        highest_academic_qualification: '',
        certificates: '',
        date_posted_on_current_station: '',
        responsibility: '',
        salary_grade: '',
        phone_number: '',
        email_address: '',
        teacher_union: ''
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchStaffs();
    }, []);

    const fetchStaffs = () => {
        axios.get('http://localhost:8000/api/staff')
            .then(response => {
                setStaffs(Array.isArray(response.data) ? response.data : []);
                toast.success("Staff loaded successfully.");
            })
            .catch(error => {
                console.error("Error fetching Staff:", error);
                setError("Failed to load Staff records.");
                setStaffs([]);
                toast.error("Failed to load Staff records.");
            });
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            // Update staff
            axios.put(`http://localhost:8000/api/staff/${selectedStaff.id}`, formData)
                .then(() => {
                    fetchStaffs();
                    resetForm();
                    toast.success("Staff updated successfully.");
                })
                .catch(error => {
                    console.error("Error updating Staff:", error);
                    console.log( error);

                    toast.error("Failed to update Staff.");
                });
        } else {
            // Add new Staf
            axios.post('http://localhost:8000/api/staff', formData)
                .then(() => {
                    fetchStaffs();
                    resetForm();
                    toast.success("Staff added successfully.");
                })
                .catch(error => {
                    console.error("Error adding Staff:", error);
                    toast.error("Failed to add Staff.");
                });
        }
    };

    const handleEdit = (staff) => {
        setSelectedStaff(staff);
        setFormData({
            full_name: staff.full_name,
            sex: staff.sex,
            staff_id: staff.staff_id,
            dob: staff.dob,
            first_pay_allowance: staff.first_pay_allowance,
            social_security: staff.social_security,
            ghana_card: staff.ghana_card,
            category: staff.category,
            rank_grade: staff.rank_grade,
            date_placed_on_rank: staff.date_placed_on_rank,
            highest_academic_qualification: staff.highest_academic_qualification,
            certificates: staff.certificates,
            date_posted_on_current_station: staff.date_posted_on_current_station,
            responsibility: staff.responsibility,
            salary_grade: staff.salary_grade,
            phone_number: staff.phone_number,
            email_address: staff.email_address,
            teacher_union: staff.teacher_union
        });
        setIsEditMode(true);
    };

    const handleView = (Staff) => {
        setSelectedStaff(Staff);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            full_name: '',
            sex: '',
            staff_id: '',
            dob: '',
            first_pay_allowance: '',
            social_security: '',
            ghana_card: '',
            category: '',
            rank_grade: '',
            date_placed_on_rank: '',
            highest_academic_qualification: '',
            certificates: '',
            date_posted_on_current_station: '',
            responsibility: '',
            salary_grade: '',
            phone_number: '',
            email_address: '',
            teacher_union: ''
        });
        setIsEditMode(false);
        setSelectedStaff(null);
    };

    const filteredStaffs = Staffs.filter(Staff =>
        Staff.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-6">Staffs Records</h2>

            <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearch}
                className="w-48 mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg space-y-4 mb-8">
                <h3 className="text-xl font-bold">{isEditMode ? "Edit Staff" : "Add Staff"}</h3>
                <div className="grid grid-cols-2 gap-4">
                    {Object.keys(formData).map((key) => (
                        <input
                            key={key}
                            type="text"
                            name={key}
                            placeholder={key.replace(/_/g, ' ')}
                            value={formData[key]}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                        />
                    ))}
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    {isEditMode ? "Update Staff" : "Add Staff"}
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

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="py-3 px-6 text-left">Full Name</th>
                            <th className="py-3 px-6 text-left">Staff ID</th>
                            <th className="py-3 px-6 text-left">Category</th>
                            <th className="py-3 px-6 text-left">Rank Grade</th>
                            <th className="py-3 px-6 text-left">Contact</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaffs.map(Staff => (
                            <tr key={Staff.id} className="border-b">
                                <td className="py-4 px-6">{Staff.full_name}</td>
                                <td className="py-4 px-6">{Staff.staff_id}</td>
                                <td className="py-4 px-6">{Staff.category}</td>
                                <td className="py-4 px-6">{Staff.rank_grade}</td>
                                <td className="py-4 px-6">{Staff.phone_number}</td>
                                <td className="py-4 px-6">
                                    <button onClick={() => handleEdit(Staff)} className="mr-2 text-blue-500 hover:underline">
                                        Edit
                                    </button>
                                    <button onClick={() => handleView(Staff)} className="text-green-500 hover:underline">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h3 className="text-lg font-semibold mb-4">Staff Details</h3>
                        {Object.keys(selectedStaff).map((key) => (
                            <p key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {selectedStaff[key]}</p>
                        ))}
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

export default StaffList;
