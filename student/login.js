import { db } from "../firebase/firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const studentId = document.getElementById("studentId").value.trim();
    const password = document.getElementById("password").value.trim();

    try {

        const querySnapshot = await getDocs(collection(db, "students"));

        let studentFound = false;

        querySnapshot.forEach((doc) => {

            const student = doc.data();

            if (
                student.studentId === studentId &&
                student.password === password
            ) {

                studentFound = true;

                localStorage.setItem(
                    "student",
                    JSON.stringify(student)
                );

                window.location.href = "dashboard.html";
            }

        });

        if (!studentFound) {
            message.innerText = "Invalid Student ID or Password";
        }

    } catch (error) {

        console.log(error);

        message.innerText = "Something went wrong.";

    }

});