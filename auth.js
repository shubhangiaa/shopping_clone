function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}


function updateNavbar() {

    const user = getLoggedInUser();

    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");
    const profileName = document.getElementById("profile-name");
    const signoutBtn = document.getElementById("signout-btn");

    if (user) {

        loginLink.style.display = "none";
        signupLink.style.display = "none";

        profileName.style.display = "block";
        profileName.innerHTML = `
    <i class="fas fa-user mr-2"></i>
    ${user.name}
`;

        signoutBtn.style.display = "block";

    } else {

        loginLink.style.display = "block";
        signupLink.style.display = "block";

        profileName.style.display = "none";
        signoutBtn.style.display = "none";
    }
}


function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";
}


updateNavbar();