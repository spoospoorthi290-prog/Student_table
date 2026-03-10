import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/studentTable";
import { studentsData } from "./data";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {
const [students, setStudents] = useState(() => {
  const savedStudents = localStorage.getItem("students");
  return savedStudents ? JSON.parse(savedStudents) : studentsData;
});
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ loading state
  

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
 // saves when any chnages made to add or update
  useEffect(() => {
  localStorage.setItem("students", JSON.stringify(students));
}, [students]);

  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  const updateStudent = (student) => {
  if (window.confirm("Are you sure you want to update this student?")) {
    setStudents(
      students.map((s) => (s.id === student.id ? student : s))
    );
    setEditingStudent(null);
  }
};

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  //
    const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, "students.xlsx");
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2>Students Table</h2>

      {loading ? (
        <h3>Loading students...</h3>
      ) : (
        <>
          <StudentForm
            addStudent={addStudent}
            editingStudent={editingStudent}
            updateStudent={updateStudent}
          />

          <button 
            style={{ margin: "10px 0", padding: "5px 10px" }} 
            onClick={downloadExcel}
          >
            Download Excel
          </button>

          <StudentTable
            students={students}
            deleteStudent={deleteStudent}
            setEditingStudent={setEditingStudent}
          />
        </>
      )}
    </div>
  );
}

export default App;