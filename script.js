// Sample array of students
const students = [
  {
    ID: 1,
    name: "Alice",
    age: 21,
    grade: "A",
    degree: "Btech",
    email: "alice@example.com",
  },
  {
    ID: 2,
    name: "Bob",
    age: 22,
    grade: "B",
    degree: "MBA",
    email: "bob@example.com",
  },
  {
    ID: 3,
    name: "Charlie",
    age: 20,
    grade: "C",
    degree: "Arts",
    email: "charlie@example.com",
  },
];

// Function to render students table
function renderStudentsTable() {
  const tableBody = document.getElementById("students-table-body");
  tableBody.innerHTML = "";

  for (const student of students) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button class="edit-button" data-id="${student.ID}">&#9998;</button>
          <button class="delete-button" data-id="${student.ID}">&#10060;</button>
        </td>
      `;
    tableBody.appendChild(row);
  }
}

// Function to clear the student form
function clearStudentForm() {
  const form = document.getElementById("student-form");
  form.reset();
  document.getElementById("submit-button").textContent = "Add Student";
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const id = document.getElementById("student-id").value;
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const grade = document.getElementById("grade").value;
  const degree = document.getElementById("degree").value;
  const email = document.getElementById("email").value;

  if (id) {
    // Editing an existing student
    const student = students.find((s) => s.ID === parseInt(id));
    if (student) {
      student.name = name;
      student.age = age;
      student.grade = grade;
      student.degree = degree;
      student.email = email;
    }
  } else {
    // Adding a new student
    const newStudent = {
      ID: students.length + 1,
      name,
      age,
      grade,
      degree,
      email,
    };
    students.push(newStudent);
  }

  renderStudentsTable();
  clearStudentForm();
}

// Function to handle edit button click
function handleEditButtonClick(event) {
  const id = parseInt(event.target.dataset.id);
  const student = students.find((s) => s.ID === id);

  if (student) {
    document.getElementById("student-id").value = student.ID;
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("grade").value = student.grade;
    document.getElementById("degree").value = student.degree;
    document.getElementById("email").value = student.email;
    document.getElementById("submit-button").textContent = "Edit Student";
  }
}

// Function to handle delete button click
function handleDeleteButtonClick(event) {
  const id = parseInt(event.target.dataset.id);
  const studentIndex = students.findIndex((s) => s.ID === id);

  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    renderStudentsTable();
  }
}

// Function to handle search input change
function handleSearchInputChange() {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.toLowerCase();

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.degree.toLowerCase().includes(searchTerm)
  );

  renderFilteredStudentsTable(filteredStudents);
}

// Function to render filtered students table
function renderFilteredStudentsTable(filteredStudents) {
  const tableBody = document.getElementById("students-table-body");
  tableBody.innerHTML = "";

  for (const student of filteredStudents) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button class="edit-button" data-id="${student.ID}">&#9998;</button>
          <button class="delete-button" data-id="${student.ID}">&#10060;</button>
        </td>
      `;
    tableBody.appendChild(row);
  }
}

// Add event listeners
document
  .getElementById("student-form")
  .addEventListener("submit", handleFormSubmit);
document
  .getElementById("students-table-body")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-button")) {
      handleEditButtonClick(event);
    } else if (event.target.classList.contains("delete-button")) {
      handleDeleteButtonClick(event);
    }
  });
document
  .getElementById("search-input")
  .addEventListener("input", handleSearchInputChange);

// Initial rendering of students table
renderStudentsTable();
