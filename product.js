
const navbarToggler = document.getElementById("navbar-toggler");
const navbarCollapse = document.getElementById("navbar");

navbarToggler.addEventListener("click", function () {
    navbarCollapse.classList.toggle("show");
});

const urlParams = new URLSearchParams(window.location.search)
console.log(urlParams);

const productID = urlParams.get("id")
console.log(productID);

function printStars(rating) {
    let stars = "";

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars += '<i class="fa-solid fa-star text-warning"></i>';
        } else if (rating >= i - 0.5) {
            stars += '<i class="fa-solid fa-star-half-stroke text-warning"></i>';
        } else {
            stars += '<i class="fa-regular fa-star text-warning"></i>';
        }
    }
    return stars;
}
fetch(`https://fakestoreapi.com/products/${productID}`)
    .then((response) => response.json())
    .then((data) => {
    const {
        id,
        image,
        title,
        description,
        price,
        rating: { rate }
    } = data;
    
        const productContainer = document.getElementById("product-details");

            let productCard = document.createElement("div");
            productCard.classList.add("col-md-6");

            productCard.innerHTML = `
                <div class="container  h-100">
                    <img height="400 " src="${image}" class="card-img-top" alt="${title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text description">${description}</p>
                        <p> <strong>Rating:${printStars(rate)}<span style="color:green">(${rate})<span></strong></p>
                        <p><strong>Price: $${price}</strong></p>
                        <button onclick="addToCart(event,${id})" class="btn btn-primary mt-auto">Add to Cart</button>
                    </div>
                </div>
            `;

            productContainer.append(productCard);
        })
    .catch((error) => console.error(error));
