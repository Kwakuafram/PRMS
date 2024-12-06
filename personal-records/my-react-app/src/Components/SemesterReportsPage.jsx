import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SemesterReportsPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reports, setReports] = useState([]);

  // Fetch all students on page load
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/student_24');
        setStudents(response.data.data || response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Failed to load students.');
      }
    };
    fetchStudents();
  }, []);

  // Fetch semester reports for the selected student
  useEffect(() => {
    if (selectedStudent) {
      const fetchReports = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/semester-reports/${selectedStudent.id}`);
          setReports(response.data.data || response.data);
        } catch (error) {
          console.error('Error fetching reports:', error);
          toast.error('Failed to load semester reports.');
        }
      };
      fetchReports();
    }
  }, [selectedStudent]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Semester Reports</h1>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Select Student</label>
        <select
          value={selectedStudent?.id || ''}
          onChange={(e) => {
            const student = students.find((s) => s.id === parseInt(e.target.value));
            setSelectedStudent(student);
          }}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} - {student.email}
            </option>
          ))}
        </select>
      </div>

      {selectedStudent && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Reports for {selectedStudent.name}</h2>
          {reports.length > 0 ? (
            <div className="space-y-6">
              {reports.map((report) => (
                <div key={report.id} className="bg-white shadow-md rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2">{report.semester}</h3>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">GPA:</span> {report.gpa}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <span className="font-medium">Comments:</span> {report.comments || 'No comments'}
                  </p>
                  <table className="w-full border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Subject</th>
                        <th className="border px-4 py-2">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.grades.map((grade, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{grade.subject}</td>
                          <td className="border px-4 py-2">{grade.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">No reports available for this student.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SemesterReportsPage;
