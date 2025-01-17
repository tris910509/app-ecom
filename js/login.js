document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Check if the email exists in localStorage
        const customers = JSON.parse(localStorage.getItem("customers")) || [];
        const user = customers.find(customer => customer.email === email);

        if (user) {
            // Check if the password matches
            const hashedPassword = sha256(password); // Use SHA-256 hash for password comparison
            if (user.password === hashedPassword) {
                // Successful login
                Swal.fire("Login Successful", "Welcome back, " + user.name, "success").then(() => {
                    // Save the logged-in user to localStorage
                    localStorage.setItem("currentUser", JSON.stringify(user));

                    // Redirect based on user role
                    if (user.role === "admin") {
                        window.location.href = "dashboard.html"; // Admin Dashboard
                    } else if (user.role === "kasir") {
                        window.location.href = "transaksi.html"; // Kasir page
                    } else if (user.role === "pelanggan") {
                        window.location.href = "produk.html"; // Pelanggan product page
                    }
                });
            } else {
                // Incorrect password
                Swal.fire("Error", "Incorrect password. Please try again.", "error");
            }
        } else {
            // Email not found
            Swal.fire("Error", "Email not found. Please register.", "error");
        }
    });
});

function sha256(str) {
    const crypto = window.crypto || window.msCrypto;
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    return crypto.subtle.digest("SHA-256", data).then(buffer => {
        return hex(buffer);
    });
}

function hex(buffer) {
    let hexCodes = [];
    let view = new DataView(buffer);
    for (let i = 0; i < buffer.byteLength; i += 4) {
        hexCodes.push(view.getUint32(i).toString(16).padStart(8, "0"));
    }
    return hexCodes.join("");
}
