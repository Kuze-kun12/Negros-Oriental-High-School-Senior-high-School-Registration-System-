



function validatePasscode() {
    const correctPasscode = "12345";
    const passcodeInput = document.getElementById("passcode");
    const userInput = passcodeInput.value.trim();

    if (!userInput) {
        alert("Please enter a passcode.");
        return;
    }

    if (userInput === correctPasscode) {
        alert("Success! Redirecting...");
        console.log("Redirecting to /STAFF/Staff.html"); // Debugging step
        window.location.href = "/STAFF/Staff.html"; // Make sure this path is correct
    } else {
        alert("Invalid Passcode. Try Again.");
        passcodeInput.value = "";
        passcodeInput.focus();
    }
}

// Allow "Enter" key to trigger validation
document.getElementById("passcode").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        validatePasscode();
    }
});

// Placeholder function for the burger menu toggle
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("active");
}

function toggleMenu() {
    var nav = document.getElementById("navMenu");
    nav.classList.toggle("nav-active");
}

