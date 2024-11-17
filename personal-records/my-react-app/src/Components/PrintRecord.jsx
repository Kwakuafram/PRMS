import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PrintRecord = () => {
  const [students, setStudents] = useState([]);
  const [houseFilter, setHouseFilter] = useState('');
  const [error, setError] = useState(null);

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

  const handleHouseFilter = (e) => {
    setHouseFilter(e.target.value);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student =>
    houseFilter ? student.house_number === houseFilter : true
  );

  const handlePrint = () => {
    const printContents = document.getElementById("print-section").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };
  const houseNumbers = [...new Set(students.map(student => student.house_number))];


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Student List by House</h1>

      <label className="block mb-4">
        <span className="text-gray-700">Select House:</span>
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
      </label>

      {error && <p className="text-red-500">{error}</p>}

      <div id="print-section">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Father's Name</th>
              <th className="py-3 px-6 text-left">House Number</th>
              <th className="py-3 px-6 text-left">Mother's Name</th>
              <th className="py-3 px-6 text-left">Contact</th>
              <th className="py-3 px-6 text-left">Gender</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-4 py-2 border">{student.name}</td>
                <td className="px-4 py-2 border">{student.fathers_name}</td>
                <td className="px-4 py-2 border">{student.house_number}</td>
                <td className="px-4 py-2 border">{student.mothers_name}</td>
                <td className="px-4 py-2 border">{student.contact}</td>
                <td className="px-4 py-2 border">{student.gender}</td>
                <td className="px-4 py-2 border">{student.status}</td>
                <td className="px-4 py-2 border">{student.dob}</td>
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
    </div>
  );
};

export default PrintRecord;
