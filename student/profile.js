const student = JSON.parse(localStorage.getItem("student"));

if (!student) {
    window.location.href = "login.html";
}

document.getElementById("studentName").textContent = student.name;
document.getElementById("studentId").textContent = student.studentId;
document.getElementById("studentCourse").textContent = student.course;
document.getElementById("studentMobile").textContent = student.mobile;

