import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GradeEntryPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [coreSubjects, setCoreSubjects] = useState([]);
  const [nonCoreSubjects, setNonCoreSubjects] = useState([]);
  const [grades, setGrades] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentStep, setCurrentStep] = useState("score"); // Steps: "score", "report"
  const [loading, setLoading] = useState(false);

  // Semester report state
  const [semesterReport, setSemesterReport] = useState({
    semester: "",
    conduct: "",
    interest: "",
    class_teacher_report: "",
    attitude: "",
    head_assist_report: "",
    vacation: "",
    year: "",
    attendance: "",
    position: "",
    academic_year: "",
  });

  // Fetch all students on page load
  useEffect(() => {
    console.log("Fetching students...");
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/student_24");
        console.log("Students fetched successfully:", response.data);
        setStudents(response.data.data || response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("Failed to load students.");
      }
    };
    fetchStudents();
  }, []);

  // Filter students based on the selected class
  useEffect(() => {
    console.log("Filtering students for class:", selectedClass);
    if (selectedClass) {
      const filtered = students.filter((student) => student.class === selectedClass);
      console.log("Filtered students:", filtered);
      setFilteredStudents(filtered);
      fetchSubjects(selectedClass);
    } else {
      console.log("No class selected, resetting subjects and students.");
      setFilteredStudents([]);
      setCoreSubjects([]);
      setNonCoreSubjects([]);
    }
  }, [selectedClass, students]);

  // Fetch subjects for the selected class
  const fetchSubjects = async (selectedClass) => {
    console.log("Fetching subjects for class:", selectedClass);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getSubjectsByClass?class=${selectedClass}`
      );
      const { core_subjects, non_core_subjects } = response.data.data || {};
      console.log("Subjects fetched successfully:", { core_subjects, non_core_subjects });
      setCoreSubjects(core_subjects || []);
      setNonCoreSubjects(non_core_subjects || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast.error("Failed to load subjects.");
    }
  };

  // Handle grade input changes
  const handleGradeChange = (subjectId, gradeType, grade) => {
    if (!selectedStudent) return;
    console.log(
      `Updating grade: Student ID ${selectedStudent.id}, Subject ID ${subjectId}, Grade Type ${gradeType}, Value ${grade}`
    );
    setGrades((prevGrades) => ({
      ...prevGrades,
      [selectedStudent.id]: {
        ...prevGrades[selectedStudent.id],
        [subjectId]: {
          ...prevGrades[selectedStudent.id]?.[subjectId],
          [gradeType]: grade,
        },
      },
    }));
  };

  // Handle semester report changes
  const handleSemesterReportChange = (field, value) => {
    console.log(`Updating semester report field: ${field}, Value: ${value}`);
    setSemesterReport((prevReport) => ({
      ...prevReport,
      [field]: value,
    }));
  };

  // Submit data for the selected student
  const handleSubmit = async () => {
    console.log("Submitting data for student:", selectedStudent);
    console.log("Grades:", grades[selectedStudent.id]);
    console.log("Semester Report:", semesterReport);

    const studentGrades = grades[selectedStudent.id] || {};
    const gradeEntries = Object.keys(studentGrades).map((subjectId) => ({
      student_id: selectedStudent.id,
      subject_id: subjectId,
      class_score: studentGrades[subjectId]?.class_score,
      exam_score: studentGrades[subjectId]?.exam_score,
    }));
    console.log("Formatted grade entries:", gradeEntries);

    try {
      setLoading(true);

      // Submit grades
      console.log("Submitting grades...");
      await axios.post("http://localhost:8000/api/grades", { grades: gradeEntries });
      console.log("Grades submitted successfully.");

      // Submit semester report
      console.log("Submitting semester report...");
      await axios.post("http://localhost:8000/api/semester-report-store", {
        student_id: selectedStudent.id,
        ...semesterReport,
      });
      console.log("Semester report submitted successfully.");

      toast.success(`Data for ${selectedStudent.name} submitted successfully!`);
      setGrades((prevGrades) => ({ ...prevGrades, [selectedStudent.id]: {} }));
      setSemesterReport({
        semester: "",
        conduct: "",
        interest: "",
        class_teacher_report: "",
        attitude: "",
        head_assist_report: "",
        vacation: "",
        year: "",
        attendance: "",
        position: "",
        academic_year: "",
      });
      setSelectedStudent(null); // Reset selected student
      setCurrentStep("score"); // Reset step to score entry
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="justify-items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Grade Entry</h1>

      {/* Class Selector */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Select Class</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-50 p-2 border rounded"
        >
          <option value="">Select a class</option>
          {[...new Set(students.map((student) => student.class))].map((classItem, index) => (
            <option key={index} value={classItem}>
              {classItem}
            </option>
          ))}
        </select>
      </div>

      {/* Student List */}
      {filteredStudents.length > 0 && !selectedStudent && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Students in {selectedClass}</h2>
          <ul className="list-disc ml-4">
            {filteredStudents.map((student) => (
              <li
                key={student.id}
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => {
                  console.log("Selected student:", student);
                  setSelectedStudent(student);
                }}
              >
                {student.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Score Entry Form */}
      {selectedStudent && currentStep === "score" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Enter Scores for {selectedStudent.name}-{selectedStudent.id}
          </h2>
          {[...coreSubjects, ...nonCoreSubjects].map((subject) => (
            <div key={subject.id} className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">{subject.name}</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={grades[selectedStudent.id]?.[subject.id]?.class_score || ""}
                  onChange={(e) => handleGradeChange(subject.id, "class_score", e.target.value)}
                  className="w-50 p-2 border rounded"
                  placeholder="Class Score"
                />
                <input
                  type="number"
                  value={grades[selectedStudent.id]?.[subject.id]?.exam_score || ""}
                  onChange={(e) => handleGradeChange(subject.id, "exam_score", e.target.value)}
                  className="w-50 p-2 border rounded"
                  placeholder="Exam Score"
                />
              </div>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition mt-4"
            onClick={() => {
              console.log("Proceeding to semester report step.");
              setCurrentStep("report");
            }}
          >
            Next: Semester Report
          </button>
        </div>
      )}

      {/* Semester Report Form */}
      {selectedStudent && currentStep === "report" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Semester Report for {selectedStudent.name}-{selectedStudent.id}
          </h2>
          {Object.keys(semesterReport).map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type="text"
                value={semesterReport[field]}
                onChange={(e) => handleSemesterReportChange(field, e.target.value)}
                className="w-100 p-2 border rounded"
              />
            </div>
          ))}
          <button
            className="bg-green-500 text-white font-medium py-2 px-4 rounded hover:bg-green-600 transition mt-4"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GradeEntryPage;
