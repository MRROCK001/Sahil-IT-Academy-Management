const student = JSON.parse(localStorage.getItem("student"));

if (!student) {
    window.location.href = "login.html";
}

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", () => {

    if (student.certificate) {

        window.open(student.certificate, "_blank");

    } else {

        alert("Certificate not available.");

    }

});