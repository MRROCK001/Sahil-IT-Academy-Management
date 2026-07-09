import { db } from "../firebase/firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const studentSelect = document.getElementById("studentSelect");
const issueDate = document.getElementById("issueDate");
const generateBtn = document.getElementById("generateBtn");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");

const certificate = document.getElementById("certificate");

const studentName = document.getElementById("studentName");
const courseName = document.getElementById("courseName");
const studentId = document.getElementById("studentId");
const certificateNo = document.getElementById("certificateNo");
const issueDateText = document.getElementById("issueDateText");

let students = [];

issueDate.valueAsDate = new Date();


// ======================
// Load Students
// ======================

async function loadStudents() {

    try {

        const snapshot = await getDocs(collection(db, "students"));

        studentSelect.innerHTML =
            `<option value="">Select Student</option>`;

        students = [];

        let count = 1;

        snapshot.forEach((doc) => {

            students.push(doc.data());

            studentSelect.innerHTML += `
                <option value="${count}">
                    ${doc.data().name}
                </option>
            `;

            count++;

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load students.");

    }

}

loadStudents();


// ======================
// Generate Certificate
// ======================

generateBtn.addEventListener("click", () => {

    if (studentSelect.value === "") {

        alert("Please Select Student");

        return;

    }

    const student = students[studentSelect.value - 1];

    const year = new Date().getFullYear();

    const serial = String(studentSelect.value).padStart(4, "0");

    studentName.textContent = student.name || "";

    courseName.textContent = student.course || "";

    studentId.textContent = "SITA" + serial;

    certificateNo.textContent = `SITA/${year}/${serial}`;

    issueDateText.textContent = new Date(issueDate.value)
        .toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

    certificate.style.display = "block";

});


// ======================
// Download PDF
// ======================

downloadPdfBtn.addEventListener("click", () => {

    if (certificate.style.display === "none") {

        alert("Please Generate Certificate First.");

        return;

    }

    const element = document.getElementById("certificate");

    const student = studentName.textContent.trim();

    const options = {

        margin: 0,

        filename: `${student}-Certificate.pdf`,

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 3,
            useCORS: true
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "landscape"
        }

    };

    html2pdf()
        .set(options)
        .from(element)
        .save();

});