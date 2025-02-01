//document.getElementById("userForm").addEventListener("submit", function (e) {
//    e.preventDefault();

//    const id = `user-${Date.now()}`;
//    const name = document.getElementById("name").value;
//    const email = document.getElementById("email").value;
//    const role = document.getElementById("role").value;
//    const status = document.getElementById("status").value;
//    const password = document.getElementById("password").value;
 //   const hashedPassword = CryptoJS.SHA256(password).toString(); // Hash password

  //  const fileInput = document.getElementById("photo");
   // const photo = fileInput.files[0] ? URL.createObjectURL(fileInput.files[0]) : "";

//  const users = JSON.parse(localStorage.getItem("users")) || [];
//  users.push({ id, name, email, role, status, password: hashedPassword, photo });
//    localStorage.setItem("users", JSON.stringify(users));

//   Swal.fire("Success", "User added successfully!", "success").then(() => {
 //   document.getElementById("userForm").reset();
//   loadUsers();
//    });
//  });

//Buat fungsi untuk memeriksa akses di setiap halaman:
//function checkAccess(requiredRole) {
 //   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

 //   if (!currentUser) {
    //    Swal.fire("Access Denied", "Please log in first.", "error").then(() => {
  //          window.location.href = "index.html";
     //   });
       // return false;
  //  }

 //   if (currentUser.role !== requiredRole && requiredRole !== "all") {
     //   Swal.fire("Access Denied", "You do not have permission to access this page.", "error").then(() => {
        //    window.location.href = "dashboard.html";
       // });
     //   return false;
 //   }

  //  return true;
}

//document.addEventListener("DOMContentLoaded", function () {
//    checkAccess("admin"); // Ganti dengan "kasir" atau "pelanggan" sesuai kebutuhan
//});



function loadUsers() {
    const usersTableBody = document.querySelector("#usersTable tbody");
    usersTableBody.innerHTML = "";

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach((user, index) => {
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td><img src="${user.photo}" alt="Photo" style="width: 50px; height: 50px;"></td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser('${user.id}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        </tr>`;
        usersTableBody.innerHTML += row;
    });
}

document.addEventListener("DOMContentLoaded", loadUsers);
