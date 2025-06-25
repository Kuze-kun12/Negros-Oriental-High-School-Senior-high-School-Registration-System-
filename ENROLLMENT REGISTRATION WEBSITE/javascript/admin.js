document.addEventListener("DOMContentLoaded", () => {
    ensurePanelistPassword();
    loadPasswords();
    document.getElementById("gradeSelection").addEventListener("change", loadPasswords);
});

function ensurePanelistPassword() {
    let grade = document.getElementById("gradeSelection").value;
    let storedPasswords = JSON.parse(localStorage.getItem("securePasswords_" + grade)) || [];
    if (!storedPasswords.includes("panelist")) {
        storedPasswords.unshift("panelist"); // Ensure "panelist" is always the first item
        localStorage.setItem("securePasswords_" + grade, JSON.stringify(storedPasswords));
    }
}

function validatePasswords() {
    let inputField = document.getElementById("adminPasswords");
    let input = inputField.value.trim();
    let passwords = input.split(/\s|,/).map(p => p.trim()).filter(p => p !== "");
    let grade = document.getElementById("gradeSelection").value;
    let storedPasswords = JSON.parse(localStorage.getItem("securePasswords_" + grade)) || [];
    let validationList = document.getElementById("validationList");

    let seenPasswords = new Set();
    validationList.innerHTML = passwords.map(p => {
        if (!/^(\d{12}|panelist)$/.test(p)) {
            return `<li class="invalid">${p} - ❌ Invalid (Must be 12 digits or 'panelist')</li>`;
        } else if (storedPasswords.includes(p)) {
            return `<li class="invalid">${p} - ⚠️ Duplicate (Already Stored)</li>`;
        } else if (seenPasswords.has(p)) {
            return `<li class="invalid">${p} - ⚠️ Duplicate (Entered Multiple Times)</li>`;
        } else {
            seenPasswords.add(p);
            return `<li class="valid">${p} - ✅ Valid</li>`;
        }
    }).join("");
}

function addPasswords() {
    let grade = document.getElementById("gradeSelection").value;
    let inputField = document.getElementById("adminPasswords");
    let input = inputField.value.trim();
    let storedPasswords = JSON.parse(localStorage.getItem("securePasswords_" + grade)) || [];
    let passwords = input.split(/\s|,/).map(p => p.trim()).filter(p => p !== "" && p !== "panelist"); // Exclude "panelist" from manual addition

    let seenPasswords = new Set();
    let validPasswords = passwords.filter(p => {
        if (/^\d{12}$/.test(p) && !storedPasswords.includes(p) && !seenPasswords.has(p)) {
            seenPasswords.add(p);
            return true;
        }
        return false;
    });

    if (validPasswords.length > 0) {
        localStorage.setItem("securePasswords_" + grade, JSON.stringify([...storedPasswords, ...validPasswords]));
        alert("✅ Passwords added successfully!");
        inputField.value = "";
        document.getElementById("validationList").innerHTML = "";
        loadPasswords();
    } else {
        alert("⚠️ No new valid passwords to add.");
    }
}

function loadPasswords() {
    let grade = document.getElementById("gradeSelection").value;
    ensurePanelistPassword(); // Always ensure "panelist" exists
    let storedPasswords = JSON.parse(localStorage.getItem("securePasswords_" + grade)) || [];
    let passwordList = document.getElementById("passwordList");

    passwordList.innerHTML = storedPasswords.map((p, i) =>
            `<li>${p === "panelist" ? "panelist (Protected)" : `${i + 1}. ************ `}
            ${p !== "panelist" ? `<button class="delete-btn" onclick="deletePassword(${i})">🗑 Delete</button>` : ""}
        </li>`
    ).join("");
}

function deletePassword(index) {
    let grade = document.getElementById("gradeSelection").value;
    let storedPasswords = JSON.parse(localStorage.getItem("securePasswords_" + grade)) || [];

    if (storedPasswords[index] !== "panelist") { // Prevent deletion of "panelist"
        storedPasswords.splice(index, 1);
        localStorage.setItem("securePasswords_" + grade, JSON.stringify(storedPasswords));
        loadPasswords();
    } else {
        alert("❌ The password 'panelist' cannot be deleted.");
    }
}

function clearAllPasswords() {
    let grade = document.getElementById("gradeSelection").value;

    if (confirm("⚠️ Are you sure you want to clear all passwords?")) {
        localStorage.removeItem("securePasswords_" + grade);
        ensurePanelistPassword(); // Ensure "panelist" is re-added
        alert("🗑 All passwords cleared except 'panelist'!");
        loadPasswords();
    }
}

function copyAllPasswords() {
    let grade = document.getElementById("gradeSelection").value;
    let storedPasswords = JSON.parse(localStorage.getItem("securePasswords_" + grade)) || [];

    if (storedPasswords.length === 0) {
        alert("⚠️ No passwords to copy.");
        return;
    }

    let passwordText = storedPasswords.join("\n");
    navigator.clipboard.writeText(passwordText).then(() => {
        alert("📋 Passwords copied to clipboard!");
    }).catch(() => {
        alert("❌ Failed to copy passwords.");
    });
}