import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EnrollmentPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/courses');
        setCourses(response.data.data || response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses.');
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/students', {
        name: studentName,
        email: studentEmail,
        course_id: selectedCourse?.id,
        option_id: selectedOption?.id || null,
      });
      toast.success('Student enrolled successfully!');
      setStudentName('');
      setStudentEmail('');
      setSelectedCourse(null);
      setSelectedOption(null);
    } catch (err) {
      console.error('Error enrolling student:', err);
      toast.error('Failed to enroll student.');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Student Enrollment</h1>
      <form onSubmit={handleEnroll} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter student name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter student email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Course</label>
          <select
            value={selectedCourse?.id || ''}
            onChange={(e) => {
              const course = courses.find((c) => c.id === parseInt(e.target.value));
              setSelectedCourse(course);
              setSelectedOption(null); // Reset option on course change
            }}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>
        {selectedCourse && selectedCourse.options.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Option</label>
            <select
              value={selectedOption?.id || ''}
              onChange={(e) => {
                const option = selectedCourse.options.find((o) => o.id === parseInt(e.target.value));
                setSelectedOption(option);
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">Select an option (optional)</option>
              {selectedCourse.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.option_name}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedCourse && selectedCourse.subjects.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Core Subjects</label>
            <ul className="list-disc list-inside">
              {selectedCourse.subjects
                .filter((subject) => subject.is_core)
                .map((subject) => (
                  <li key={subject.id}>{subject.name}</li>
                ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Enroll Student
        </button>
      </form>
    </div>
  );
};

export default EnrollmentPage;
