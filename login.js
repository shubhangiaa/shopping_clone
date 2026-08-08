const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(
        user => user.email === email &&
                user.password === password
    );

    if (!user) {
        alert("Invalid email or password");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login successful!");

    window.location.href = "index.html";
});

let loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {

    document.getElementById("login-link").style.display = "none";
    document.getElementById("signup-link").style.display = "none";
    document.getElementById("logout-link").style.display = "block";
}

function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";
}
localStorage.setItem(
    "loggedInUser",
    JSON.stringify(user)
);

window.location.href = "index.html";