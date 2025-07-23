const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");
let editIndex = null;

document.addEventListener("DOMContentLoaded", renderTable);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!name || !studentId || !email || !contact) {
    alert("All fields are required.");
    return;
  }

  if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name must contain only letters.");
    return;
  }

  if (!/^\d+$/.test(studentId)) {
    alert("Student ID must contain only numbers.");
    return;
  }

  if (!/^\d{10}$/.test(contact)) {
    alert("Contact number must be 10 digits.");
    return;
  }

  const student = { name, studentId, email, contact };

  if (editIndex === null) {
    addStudent(student);
  } else {
    updateStudent(student);
  }

  form.reset();
});

function addStudent(student) {
  const students = getStudents();
  students.push(student);
  saveStudents(students);
  renderTable();
}

function updateStudent(student) {
  const students = getStudents();
  students[editIndex] = student;
  saveStudents(students);
  editIndex = null;
  renderTable();
}

function deleteStudent(index) {
  const students = getStudents();
  students.splice(index, 1);
  saveStudents(students);
  renderTable();
}

function editStudent(index) {
  const student = getStudents()[index];
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;
  editIndex = index;
}

function renderTable() {
  const students = getStudents();
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = `<tr>
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td class="actions">
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

function getStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}
