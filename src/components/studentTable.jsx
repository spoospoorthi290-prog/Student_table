function StudentTable({ students, deleteStudent, setEditingStudent }) {

  return (
    <table border="1" style={{ marginTop: "20px" }}>

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {students.map((student) => (
          <tr key={student.id}>

            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>

            <td>

              <button
                onClick={() => setEditingStudent(student)}
              >
                Edit
              </button>

              <button
                onClick={() => deleteStudent(student.id)}
              >
                Delete
              </button>

            </td>

          </tr>
        ))}

      </tbody>

    </table>
  );
}

export default StudentTable;