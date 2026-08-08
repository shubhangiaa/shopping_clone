const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check existing email
    let existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("Email already registered");
        return;
    }

    let user = {
        name: name,
        email: email,
        password: password
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");

    window.location.href = "login.html";
});