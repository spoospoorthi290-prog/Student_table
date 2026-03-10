import { useState, useEffect } from "react";

function StudentForm({ addStudent, editingStudent, updateStudent }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (editingStudent) {
      setForm(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.age) {
      alert("All fields are required");
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;

    if (!emailPattern.test(form.email)) {
      alert("Invalid email format");
      return;
    }

    if (editingStudent) {
      updateStudent(form);
    } else {
      addStudent(form);
    }

    setForm({
      name: "",
      email: "",
      age: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
      type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />

      <button type="submit">
  {editingStudent ? "Update Student" : "Add Student"}
</button>

<button
  type="button"
  onClick={() => {
    setForm({ name: "", email: "", age: "" });
    editingStudent && updateStudent(null);
  }}
>
  Cancel
</button>

    </form>
  );
}

export default StudentForm;