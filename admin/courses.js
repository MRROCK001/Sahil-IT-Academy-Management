import { db } from "../firebase/firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const form = document.getElementById("courseForm");
const tbody = document.getElementById("courseList");

// =========================
// Load Courses
// =========================

async function loadCourses() {

    tbody.innerHTML = "";

    const snapshot = await getDocs(collection(db, "courses"));

    let count = 1;

    snapshot.forEach((courseDoc) => {

        const course = courseDoc.data();
        const id = courseDoc.id;

        tbody.innerHTML += `
        <tr>

            <td>C${String(count).padStart(3,"0")}</td>

            <td>${course.courseName}</td>

            <td>₹${course.courseFees}</td>

            <td>${course.courseDuration}</td>

            <td>
                <button onclick="deleteCourse('${id}')">
                    🗑 Delete
                </button>
            </td>

        </tr>
        `;

        count++;

    });

}

loadCourses();


// =========================
// Add Course
// =========================

form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const course={

        courseName:document.getElementById("courseName").value,

        courseFees:document.getElementById("courseFees").value,

        courseDuration:document.getElementById("courseDuration").value

    };

    try{

        await addDoc(collection(db,"courses"),course);

        alert("✅ Course Added Successfully");

        form.reset();

        loadCourses();

    }

    catch(error){

        console.log(error);

        alert(error.message);

    }

});


// =========================
// Delete Course
// =========================

window.deleteCourse=async(id)=>{

    const confirmDelete=confirm("Delete this course?");

    if(!confirmDelete) return;

    try{

        await deleteDoc(doc(db,"courses",id));

        alert("✅ Course Deleted");

        loadCourses();

    }

    catch(error){

        console.log(error);

        alert(error.message);

    }

}