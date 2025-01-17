


document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const adminCount = users.filter(u => u.role === "admin").length;
    const kasirCount = users.filter(u => u.role === "kasir").length;
    const pelangganCount = users.filter(u => u.role === "pelanggan").length;

    if (!currentUser) {
        Swal.fire("Access Denied", "Please log in first.", "error").then(() => {
            window.location.href = "index.html";
        });
        return;
    }

    document.getElementById("welcomeMessage").textContent = `Welcome, ${currentUser.name}! Your role: ${currentUser.role}`;
    document.getElementById("stats").innerHTML = `
        <p>Admins: ${adminCount}</p>
        <p>Kasirs: ${kasirCount}</p>
        <p>Pelanggans: ${pelangganCount}</p>
    `;
});
