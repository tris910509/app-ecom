document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser || currentUser.role !== "kasir") {
        Swal.fire("Access Denied", "You don't have permission to access this page.", "error").then(() => {
            window.location.href = "login.html";
        });
    }
});

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
