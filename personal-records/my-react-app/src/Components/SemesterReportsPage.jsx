import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SemesterReportsPage = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [reports, setReports] = useState([]);
    const [grades, setGrades] = useState([]);

    // Fetch all students on page load
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/student_24"
                );
                setStudents(response.data.data || response.data);
            } catch (error) {
                console.error("Error fetching students:", error);
                toast.error("Failed to load students.");
            }
        };
        fetchStudents();
    }, []);

    // Fetch semester reports for the selected student
    useEffect(() => {
        if (selectedStudent) {
            const fetchReports = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8000/api/semester-reports/${selectedStudent.id}`
                    );
                    setReports(response.data.data || response.data);
                } catch (error) {
                    console.error("Error fetching reports:", error);
                    toast.error("Failed to load semester reports.");
                }
            };
            fetchReports();
        }
    }, [selectedStudent]);

    useEffect(() => {
        if (selectedStudent) {
            const fetchGrade = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8000/api/grade/${selectedStudent.id}`
                    );
                    setGrades(response.data.data || response.data);
                } catch (error) {
                    console.error("Error fetching reports:", error);
                    toast.error("Failed to load semester reports.");
                }
            };
            fetchGrade();
        }
    }, [selectedStudent]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Semester Academic Report
            </h1>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Select Student
                </label>
                <select
                    value={selectedStudent?.id || ""}
                    onChange={(e) => {
                        const student = students.find(
                            (s) => s.id === parseInt(e.target.value)
                        );
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
                    <div className="bg-white shadow-lg border rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-center mb-4">
                            Semester Report
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <p>
                                <strong>Name:</strong> {selectedStudent.name}
                            </p>
                            <p>
                                <strong>Class:</strong>{" "}
                                {selectedStudent.class || "N/A"}
                            </p>
                            <p>
                                <strong>Attendance:</strong>{" "}
                                {reports[0]?.attendance || "N/A"}
                            </p>
                            <p>
                                <strong>Position:</strong>{" "}
                                {reports[0]?.position || "N/A"}
                            </p>
                            <p>
                                <strong>Average Score:</strong>{" "}
                                {reports[0]?.average_score || "N/A"}
                            </p>
                            <p>
                                <strong>Semester:</strong>{" "}
                                {reports[0]?.semester || "N/A"}
                            </p>
                        </div>

                        {reports.map((report) => (
                            <div key={report.id} className="mb-6">
                               

                                <table className="w-full border mb-4">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border px-4 py-2">
                                                Subject
                                            </th>
                                            <th className="border px-4 py-2">
                                                Class Score
                                            </th>
                                            <th className="border px-4 py-2">
                                                Exam Score
                                            </th>
                                            <th className="border px-4 py-2">
                                                Total
                                            </th>
                                            <th className="border px-4 py-2">
                                                Grade
                                            </th>
                                            <th className="border px-4 py-2">
                                                Remarks
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {grades.map((grade, index) => (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">
                                                    {grade.subject || "N/A"}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {grade.class_score || "N/A"}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {grade.exam_score || "N/A"}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {grade.total_score || "N/A"}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {grade.grade || "N/A"}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {grade.remarks || "N/A"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}

                        <p className="grid grid-cols-2 gap-4 mb-4">
                            <p>
                                <strong>Conduct:</strong>{" "}
                                {reports[0]?.conduct || "N/A"}
                            </p>
                            <p>
                                <strong>Interest:</strong>{" "}
                                {reports[0]?.interest || "N/A"}
                            </p>
                            <p>
                                <strong>Class Teaher Report:</strong>{" "}
                                {reports[0]?.class_teacher_report || "N/A"}
                            </p>
                            <p>
                                <strong>Head Assist Report:</strong>{" "}
                                {reports[0]?.head_assist_report || "N/A"}
                            </p>
                            <p>
                                <strong>Vacation:</strong>{" "}
                                {reports[0]?.vacation || "N/A"}
                            </p>
                            <p>
                                <strong>Attitude:</strong>{" "}
                                {reports[0]?.attitude || "N/A"}
                            </p>
                            <p>
                                {" "}
                                <strong>
                                    Next Semester Begins:
                                </strong> Sunday,{" "}
                                {reports[0]?.next_semester_date || "N/A"}
                            </p>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SemesterReportsPage;
