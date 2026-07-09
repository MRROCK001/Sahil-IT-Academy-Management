import { db } from "../firebase/firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const studentCount = document.getElementById("studentCount");
const courseCount = document.getElementById("courseCount");

// =========================
// Load Dashboard Data
// =========================

async function loadDashboard() {

    try {

        const students = await getDocs(collection(db, "students"));
        studentCount.innerText = students.size;

        const courses = await getDocs(collection(db, "courses"));
        courseCount.innerText = courses.size;

    }

    catch (error) {

        console.log(error);

    }

}

// =========================
// Logout
// =========================

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        const logout = confirm(
            "Are you sure you want to logout?"
        );

        if (!logout) return;

        localStorage.clear();

        window.location.href = "login.html";

    });

// =========================

loadDashboard();