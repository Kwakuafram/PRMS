import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const GradeEntryPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState({});
  const [semester, setSemester] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch students on page load
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

  // Fetch subjects for the selected student's course
  useEffect(() => {
    if (selectedStudent) {
      const fetchSubjects = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/subjects/${selectedStudent.course_id}`);
          setSubjects(response.data.data || response.data);
        } catch (error) {
          console.error('Error fetching subjects:', error);
          toast.error('Failed to load subjects.');
        }
      };
      fetchSubjects();
    }
  }, [selectedStudent]);

  const handleGradeChange = (subjectId, grade) => {
    setGrades({ ...grades, [subjectId]: grade });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !semester) {
      toast.error('Please select a student and semester.');
      return;
    }

    const gradeEntries = Object.entries(grades).map(([subjectId, grade]) => ({
      student_id: selectedStudent.id,
      subject_id: parseInt(subjectId),
      semester,
      grade,
    }));

    try {
      setLoading(true);
      await axios.post('http://localhost:8000/api/grades', { grades: gradeEntries });
      toast.success('Grades submitted successfully!');
      setGrades({});
      setSemester('');
    } catch (error) {
      console.error('Error submitting grades:', error);
      toast.error('Failed to submit grades.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Grade Entry</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Select Student</label>
          <select
            value={selectedStudent?.id || ''}
            onChange={(e) => {
              const student = students.find((s) => s.id === parseInt(e.target.value));
              setSelectedStudent(student);
              setGrades({});
            }}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} - {student.class}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Semester</label>
          <input
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., Semester 1, Fall 2024"
            required
          />
        </div>
        {selectedStudent && subjects.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Subjects and Grades</label>
            {subjects.map((subject) => (
              <div key={subject.id} className="mb-2">
                <span className="block text-gray-700">{subject.name}</span>
                <input
                  type="text"
                  value={grades[subject.id] || ''}
                  onChange={(e) => handleGradeChange(subject.id, e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter grade (e.g., A, B, C)"
                  required
                />
              </div>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Grades'}
        </button>
      </form>
    </div>
  );
};

export default GradeEntryPage;
