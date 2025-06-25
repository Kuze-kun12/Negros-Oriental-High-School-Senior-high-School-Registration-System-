function downloadAndRedirect(gender, fileName, formLink) {
    // Create a hidden <a> element to trigger the download
    var link = document.createElement("a");
    link.href = fileName;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Open the form link in a new tab
    setTimeout(function() {
        window.open(formLink, '_blank');

        // Redirect the current tab to students.html (outside the current folder)
        setTimeout(function() {
            window.location.href = '/index.html'; // '../' moves up one folder level
        }, 10000); // Delay to ensure new tab opens first
    }, 2000); // Adjust delay if needed
}