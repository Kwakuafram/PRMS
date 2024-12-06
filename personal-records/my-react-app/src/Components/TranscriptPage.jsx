import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TranscriptPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [transcript, setTranscript] = useState(null);

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

  // Fetch transcript for the selected student
  useEffect(() => {
    if (selectedStudent) {
      const fetchTranscript = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/transcripts/${selectedStudent.id}`);
          setTranscript(response.data.data || response.data);
        } catch (error) {
          console.error('Error fetching transcript:', error);
          toast.error('Failed to load transcript.');
        }
      };
      fetchTranscript();
    }
  }, [selectedStudent]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Student Transcript</h1>

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

      {transcript && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Transcript for {transcript.student.name} ({transcript.student.course} - {transcript.student.option || 'N/A'})
          </h2>

          <table className="w-full border mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Semester</th>
                <th className="border px-4 py-2">GPA</th>
                <th className="border px-4 py-2">Comments</th>
              </tr>
            </thead>
            <tbody>
              {transcript.transcript.map((report, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{report.semester}</td>
                  <td className="border px-4 py-2">{report.gpa}</td>
                  <td className="border px-4 py-2">{report.comments || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-xl font-bold mb-4">Grades Overview</h3>
          {transcript.transcript.map((report, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-lg font-semibold">{report.semester}</h4>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Subject</th>
                    <th className="border px-4 py-2">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {report.grades.map((grade, idx) => (
                    <tr key={idx}>
                      <td className="border px-4 py-2">{grade.subject}</td>
                      <td className="border px-4 py-2">{grade.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <button
            onClick={handlePrint}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Print Transcript
          </button>
        </div>
      )}
    </div>
  );
};

export default TranscriptPage;
