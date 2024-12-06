import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PrintRecord = () => {
    const [records, setRecords] = useState([]);
    const [houseFilter, setHouseFilter] = useState("");
    const [classFilter, setClassFilter] = useState("");

    const [recordType, setRecordType] = useState("students"); // Default to 'students'
    const [error, setError] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);

    // Fetch data based on the selected record type (students or staff)
    const fetchRecords = () => {
        const url =
            recordType === "students"
                ? "http://localhost:8000/api/student_24"
                : "http://localhost:8000/api/staff";

        axios
            .get(url)
            .then((response) => {
                setRecords(Array.isArray(response.data) ? response.data : []);
                toast.success(
                    `${
                        recordType === "students" ? "Students" : "Staff"
                    } loaded successfully.`
                );
            })
            .catch((error) => {
                console.error(`Error fetching ${recordType}:`, error);
                setError(`Failed to load ${recordType} records.`);
                setRecords([]);
                toast.error(`Failed to load ${recordType} records.`);
            });
    };

    const handleRecordTypeChange = (e) => {
        setRecordType(e.target.value);
        setRecords([]); // Reset records when type changes
        setSelectedStaff(null); // Reset staff selection
    };

    const handleHouseFilter = (e) => {
        setHouseFilter(e.target.value);
    };

    const handleClassFilter = (e) => {
        setClassFilter(e.target.value);
    };

    const handleStaffSelect = (staff) => {
        setSelectedStaff(staff); // Set selected staff for display/edit
    };

    useEffect(() => {
        fetchRecords();
    }, [recordType]);
    console.log("Records:", records); // Log records before rendering

    const filteredRecords = records.filter(
        (record) =>
            (houseFilter ? record.house_number === houseFilter : true) &&
            (classFilter ? record.class === classFilter : true)
    );
    console.log(filteredRecords); // Check the filtered records

    const handlePrint = () => {
        const printContents =
            document.getElementById("print-section").innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };

    const houseNumbers = [
        ...new Set(records.map((record) => record.house_number)),
    ];
    const Class = [...new Set(records.map((record) => record.class))];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Record List</h1>

            {/* Dropdown to select record type */}
            <label className="block mb-4">
                <span className="text-gray-700">Select Record Type:</span>
                <select
                    value={recordType}
                    onChange={handleRecordTypeChange}
                    className="w-48 px-3 py-2 border hover:ring-2 hover:ring-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="students">Students</option>
                    <option value="staff">Staff</option>
                </select>
            </label>

            {/* Dropdown to filter by house */}
            {recordType === "students" && (
                <label className="block mb-4">
                    <span className="text-gray-700">Select House:</span>
                    <select
                        value={houseFilter}
                        onChange={handleHouseFilter}
                        className="w-48 px-3 py-2 border hover:ring-2 hover:ring-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Filter by House</option>
                        {houseNumbers.map((house, index) => (
                            <option key={index} value={house}>
                                House {house}
                            </option>
                        ))}
                    </select>
                </label>
            )}
            <label className="block mb-4">
                <span className="text-gray-700">Select Class:</span>
                <select
                    value={classFilter}
                    onChange={handleClassFilter}
                    className="w-48 px-3 py-2 border hover:ring-2 hover:ring-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Filter by Class</option>
                    {Class.map((className, index) => (
                        <option key={index} value={className}>
                            {" "}
                            {className}
                        </option>
                    ))}
                </select>
            </label>
            {error && <p className="text-red-500">{error}</p>}

            <div id="print-section">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            {/* Dynamic Columns for Students or Staff */}

                            {recordType === "students" && (
                                <>
                                    <th className="py-3 px-6 text-left">
                                        Name
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Contact
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Gender
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Status
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        House Number
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Date Of Birth
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Class
                                    </th>
                                 
                                    <th className="py-3 px-6 text-left">
                                        Option
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Image
                                    </th>
                                </>
                            )}
                            {recordType === "staff" && (
                                <>
                                    <th className="py-3 px-6 text-left">
                                        Name
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Contact
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Gender
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Staff ID
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Actions
                                    </th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.map((record) => (
                            <tr key={record.id}>
                                {recordType === "students" && (
                                    <>
                                        <td className="px-4 py-2 border">
                                            {record.name}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {record.contact}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {record.gender}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {record.status}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {record.house_number}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {record.dob}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {record.class}
                                        </td>
                                    
                                        <td className="px-4 py-2 border">
                                            {record.option
                                                ? record.option.option_name
                                                : "N/A"}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {record.image ? (
                                                <img
                                                    src={`http://localhost:8000/storage/${record.image}`}
                                                    alt={`${record.name}'s profile`}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                    </>
                                )}
                                {recordType === "staff" && (
                                    <>
                                        <td className="px-4 py-2 border">
                                            {record.full_name}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {record.phone_number}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {record.sex}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {record.staff_id}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <button
                                                onClick={() =>
                                                    handleStaffSelect(record)
                                                }
                                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={handlePrint}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Print
                </button>
            </div>

            {/* Display staff details form */}
            {recordType === "staff" && selectedStaff && (
                <div className="overflow-auto max-h-96 mt-6">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">
                            Staff Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(selectedStaff).map(
                                ([key, value]) => (
                                    <div key={key}>
                                        <label className="block font-medium text-gray-700">
                                            {key.replace(/_/g, " ")}
                                        </label>
                                        <input
                                            type="text"
                                            value={value}
                                            readOnly
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrintRecord;
