import { db } from "../firebase/firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const form = document.getElementById("studentForm");
const tbody = document.getElementById("studentList");
const courseSelect = document.getElementById("course");

// =========================
// Load Courses
// =========================

async function loadCourses() {

    courseSelect.innerHTML = `<option value="">Select Course</option>`;

    try {

        const snapshot = await getDocs(collection(db, "courses"));

        snapshot.forEach((courseDoc) => {

            const course = courseDoc.data();

            courseSelect.innerHTML += `
                <option value="${course.courseName}">
                    ${course.courseName}
                </option>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

// =========================
// Load Students
// =========================

async function loadStudents() {

    tbody.innerHTML = "";

    try {

        const snapshot = await getDocs(collection(db, "students"));

        snapshot.forEach((studentDoc) => {

            const student = studentDoc.data();
            const id = studentDoc.id;

            tbody.innerHTML += `
<tr>

    <td>${student.studentId}</td>

    <td>${student.name}</td>

    <td>${student.username}</td>

    <td>${student.course}</td>

    <td>${student.mobile}</td>

    <td>₹${student.fees}</td>

    <td>

        <button onclick="deleteStudent('${id}')">

            🗑 Delete

        </button>

    </td>

</tr>
`;

        });

    } catch (error) {

        console.log(error);

    }

}

// =========================
// Add Student
// =========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        // Total Students Count
        const snapshot = await getDocs(collection(db, "students"));

        const nextNumber = snapshot.size + 1;

        // Student ID
        const studentId = `SITA${String(nextNumber).padStart(4, "0")}`;

        // Mobile
        const mobile = document.getElementById("mobile").value.trim();

        // Password = Last 6 Digits
        const password = mobile.slice(-6);

        const student = {

            studentId: studentId,

            username: studentId,

            password: password,

            name: document.getElementById("studentName").value,

            fatherName: document.getElementById("fatherName").value,

            email: document.getElementById("email").value,

            mobile: mobile,

            course: document.getElementById("course").value,

            fees: document.getElementById("fees").value,

            joiningDate: document.getElementById("joiningDate").value,

            createdAt: new Date()

        };

        await addDoc(collection(db, "students"), student);

        alert(
            `✅ Student Added Successfully

Student ID : ${studentId}

Username : ${studentId}

Password : ${password}`
        );

        form.reset();

        loadStudents();

        loadCourses();

    }

    catch (error) {

        console.log(error);

        alert(error.message);

    }

});


// =========================
// Delete Student
// =========================

window.deleteStudent = async function (id) {

    if (!confirm("Delete this student?")) return;

    try {

        await deleteDoc(doc(db, "students", id));

        alert("✅ Student Deleted Successfully");

        loadStudents();

    }

    catch (error) {

        console.log(error);

        alert(error.message);

    }

};


// =========================
// Initial Load
// =========================

loadCourses();

loadStudents();