document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("userForm");
    const usersTable = document.getElementById("usersTable").querySelector("tbody");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    function saveUsers() {
        localStorage.setItem("users", JSON.stringify(users));
    }

    function renderUsers() {
        usersTable.innerHTML = "";
        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.status}</td>
                <td><img src="${user.photo || "default.png"}" alt="Photo" style="width: 50px; height: 50px; border-radius: 50%;"></td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser('${user.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">Delete</button>
                </td>
            `;
            usersTable.appendChild(row);
        });
    }

    function generateID() {
        return "user-" + Date.now();
    }

    function sha256(str) {
        return crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then(buffer => {
            return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
        });
    }

    userForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const id = generateID();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = await sha256(document.getElementById("password").value);
        const role = document.getElementById("role").value;
        const status = document.getElementById("status").value;
        const photoFile = document.getElementById("photo").files[0];
        const photo = photoFile ? URL.createObjectURL(photoFile) : null;

        users.push({ id, name, email, password, role, status, photo });
        saveUsers();
        renderUsers();

        Swal.fire("Success", "User added successfully!", "success");
        userForm.reset();
        bootstrap.Modal.getInstance(document.getElementById("userModal")).hide();
    });

    window.editUser = function (id) {
        const user = users.find(u => u.id === id);
        if (user) {
            document.getElementById("name").value = user.name;
            document.getElementById("email").value = user.email;
            document.getElementById("role").value = user.role;
            document.getElementById("status").value = user.status;

            Swal.fire("Edit Mode", "Editing user: " + user.name, "info");
        }
    };

    window.deleteUser = function (id) {
        const index = users.findIndex(u => u.id === id);
        if (index > -1) {
            users.splice(index, 1);
            saveUsers();
            renderUsers();

            Swal.fire("Deleted", "User has been deleted.", "success");
        }
    };

    renderUsers();
});
