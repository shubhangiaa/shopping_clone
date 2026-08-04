let products = [];
const navbarToggler = document.getElementById("navbar-toggler");
const navbarCollapse = document.getElementById("navbar");

navbarToggler.addEventListener("click", function () {
    navbarCollapse.classList.toggle("show");
});

function showAlert(msg, type) {
    const alertContainer = document.getElementById("alert-container")
    const alert = document.createElement("div")
    alert.classList.add("alert", `alert-${type}`, "alert-dismissible", "fade", "show");

     alert.innerHTML = `
    ${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
`;
    alertContainer.append(alert)
    setTimeout(
        () => {
            alert.classList.remove("show")
            alert.addEventListener("transitionend",function(){
                alertContainer.removeChild(alert)
            });
        }, 2000);
        
    };


fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        const productContainer = document.getElementById("product-container");

        data.map(({ id, image, title, description, price, rating: { rate } }) => {

            let productCard = document.createElement("div");
            productCard.classList.add("col-md-4", "mb-3");

            productCard.innerHTML = `
                <div class="card h-100" onclick="showProductDetails(${id})">
                    <img height="400 " src="${image}" class="card-img-top" alt="${title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text description">${description}</p>
                        <p><strong>Rating: <img width="40" height="40" src="https://img.icons8.com/fluency/100/christmas-star.png" alt="christmas-star"/> ${rate}</strong></p>
                        <p><strong>Price: $${price}</strong></p>
                        <button onclick="addToCart(event,${id})" class="btn btn-primary mt-auto">Add to Cart</button>
                    </div>
                </div>
            `;

            productContainer.appendChild(productCard);
        });
    })
    .catch((error) => console.error(error));

function showProductDetails(id) {
    const currentPath = window.location.pathname
    console.log(currentPath);
    const newPath = currentPath.replace("index.html", "product.html" + `?id=${id}`);
    console.log(newPath);
    window.location.href = newPath;

}

function addToCart(e, id) {
    e.stopPropagation();
    showAlert("Product added to Cart", "success");
}