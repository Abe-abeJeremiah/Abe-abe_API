// app.js
const API_URL = 'http://localhost:3000/students';

document.addEventListener('DOMContentLoaded', loadStudents);

// 1. READ (GET)
async function loadStudents() {
    const response = await fetch(API_URL);
    const students = await response.json();
    
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';

    students.forEach(student => {
        const row = `
            <tr>
                <td>${student.id.substring(0, 8)}...</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.year}</td>
                <td>
                    <button class="action-btn edit" onclick="editStudent('${student.id}', '${student.name}', '${student.course}', '${student.year}')">Edit</button>
                    <button class="action-btn delete" onclick="deleteStudent('${student.id}')">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// 2. CREATE / UPDATE (POST / PUT)
async function saveStudent() {
    const id = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
    const year = document.getElementById('year').value;

    if (!name || !course || !year) {
        alert("Please fill all fields");
        return;
    }

    const data = { name, course, year };

    if (id) {
        // UPDATE (PUT)
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } else {
        // CREATE (POST)
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    clearForm();
    loadStudents();
}

// 3. DELETE
async function deleteStudent(id) {
    if(confirm('Are you sure you want to delete this student?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadStudents();
    }
}

// Helper functions
function editStudent(id, name, course, year) {
    document.getElementById('studentId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('course').value = course;
    document.getElementById('year').value = year;

    document.getElementById('saveBtn').innerText = 'Update Student';
    document.getElementById('cancelBtn').style.display = 'inline-block';
}

function clearForm() {
    document.getElementById('studentId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('course').value = '';
    document.getElementById('year').value = '';

    document.getElementById('saveBtn').innerText = 'Add Student';
    document.getElementById('cancelBtn').style.display = 'none';
}