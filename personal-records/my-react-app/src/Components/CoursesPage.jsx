import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getCourse');
        console.log('API Response:', response.data); // Debugging

        // Check if the response contains valid data
        if (response.data && Array.isArray(response.data.data)) {
          setCourses(response.data.data);
        } else {
          setCourses([]);
          console.warn('Unexpected response format:', response.data);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.response?.data?.message || 'Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{course.course_name}</h2>
            <p className="text-gray-600 mt-2">{course.description || 'No description available.'}</p>

            {/* Core Subjects */}
            {/* <div className="mt-4">
              <h3 className="font-medium">Core Subjects:</h3>
              <ul className="list-disc list-inside">
                {Array.isArray(course.subjects) && course.subjects.length > 0 ? (
                  course.subjects
                    .filter((subject) => subject.is_core) // Filter core subjects
                    .map((subject) => <li key={subject.id}>{subject.name}</li>)
                ) : (
                  <li>No core subjects available for this course.</li>
                )}
              </ul>
            </div> */}

            {/* Options */}
            <div className="mt-4">
              <h3 className="font-medium">Options:</h3>
              <ul className="list-disc list-inside">
                {Array.isArray(course.options) && course.options.length > 0 ? (
                  course.options.map((option) => (
                    <li key={option.id}>
                      <strong>{option.option_name}</strong>
                      <ul className="ml-4">
                        {Array.isArray(option.subjects) && option.subjects.length > 0 ? (
                          option.subjects.map((subject) => (
                            <li key={subject.id}>
                              {subject.name} {subject.is_core ? '(Core)' : ''}
                            </li>
                          ))
                        ) : (
                          <li>No subjects available for this option.</li>
                        )}
                      </ul>
                    </li>
                  ))
                ) : (
                  <li>No options available.</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
