document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginBtn").addEventListener("click", studentLogin);
});

// Student Login Function
function studentLogin() {
    let grade = document.getElementById("studentGrade").value.trim();
    let enteredPassword = document.getElementById("studentPassword").value.trim();
    let loginMessage = document.getElementById("loginMessage");

    if (!grade || !enteredPassword) {
        loginMessage.textContent = "Please enter your grade and password!";
        loginMessage.className = "invalid";
        return;
    }

    let storedPasswords = JSON.parse(localStorage.getItem("securePasswords_" + grade)) || [];

    if (enteredPassword === "panelist" || storedPasswords.includes(enteredPassword)) {
        loginMessage.textContent = "Login successful!";
        loginMessage.className = "valid";

        if (enteredPassword !== "panelist") {
            let index = storedPasswords.indexOf(enteredPassword);
            storedPasswords.splice(index, 1);
            localStorage.setItem("securePasswords_" + grade, JSON.stringify(storedPasswords));
        }

        document.getElementById("studentPassword").value = "";

        let redirectPage = (grade === "12") ? "/Grade-12/selected-12.html" : "/Grade-11/selected-11.html";
        setTimeout(() => {
            window.location.href = redirectPage;
        }, 1000);
    } else {
        loginMessage.textContent = "Invalid password!";
        loginMessage.className = "invalid";
    }
}