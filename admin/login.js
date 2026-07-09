import { auth } from "../firebase/firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {

            console.log("Login Success:", userCredential.user);

            window.location.href = "dashboard.html";

        })

        .catch((error) => {

            console.error(error);

            msg.innerHTML = error.code + "<br>" + error.message;

        });

});
