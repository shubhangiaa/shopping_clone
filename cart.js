const navbarToggler = document.getElementById("navbar-toggler");
const navbarCollapse = document.getElementById("navbar");

navbarToggler.addEventListener("click", function () {
    navbarCollapse.classList.toggle("show");
});

let cartitems = document.getElementById("cart-items")
let carttotal = document.getElementById("cart-total")
let buynowbtn = document.getElementById("buy-now-button")



let cart = JSON.parse(localStorage.getItem("cart")) || []

console.log(cart);


function updatecartui() {
    cartitems.innerHTML = ""
    let total = 0;
    cart.map((item, index) => {
        const cartitem = document.createElement("div")
        cartitem.classList.add("list-group-item", "d-flex", "justify-content-between")
        cartitem.innerHTML = `
        
    <div class="col-6 text-truncate  custom-padding" style="padding: 10;" align-items-center p-auto">
        <strong class="product-title" title="${item.title}">${item.title}</strong>
    </div>

    <div class="col-3  align-text-center  custom-padding">
        <span class="text-success font-weight-bold">$${parseFloat(item.price).toFixed(2)}</span>
    </div>


<div class="col-2 align-items-center d-flex custom-padding ">
<button type="button" class="btn btn-primary rounded-0 decrement"data-index="${index}">-</button>

<button type="button" class="btn rounded-0 "data-index="${index}">${item.quantity}</button>
  <button type="button" class="btn btn-primary rounded-0 increment" data-index="${index}">+</button>
  <button type="button" class="btn  rounded-0 remove"data-index="${index}"><img width="48" height="48" src="https://img.icons8.com/emoji/48/cross-mark-emoji.png" alt="cross-mark-emoji"/></button>
</div>`;

        cartitems.append(cartitem)
        total += item.price * item.quantity
        console.log(total);
        carttotal.innerText = `$ ${total.toFixed(2)}`;
    });


    let increment = document.querySelectorAll(".increment");
    console.log(increment);
    increment.forEach((btn) => {
        console.log(btn);
        btn.addEventListener("click", function (event) {
            console.log(event.target);
            let id = event.target.getAttribute("data-index");
            console.log(id);
            console.log(cart[id].quantity);

            cart[id].quantity++;
            setCartToLocalStorage();
            updatecartui();
        });
    });
    let decrement = document.querySelectorAll(".decrement");
    console.log(decrement);
    decrement.forEach((btn) => {
        console.log(btn);
        btn.addEventListener("click", function (event) {
            console.log(event.target);
            let id = event.target.getAttribute("data-index");
            console.log(id);
            console.log(cart[id].quantity);
            if (cart[id].quantity > 1) {

                cart[id].quantity--;
            }
            setCartToLocalStorage();
            updatecartui();
        });
    });

    let remove = document.querySelectorAll(".remove");
    console.log(remove);
    remove.forEach((btn) => {
        console.log(btn);
        btn.addEventListener("click", function (event) {
            console.log(event.target);
            let id = event.target.getAttribute("data-index");
            cart.splice(id, 1)
            setCartToLocalStorage();
            updatecartui();
        });
    });
    function setCartToLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}
updatecartui() 

buynowbtn.addEventListener("click", handleBuy);

function handleBuy() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("buy", cart);
  if (cart.length === 0) {
    Swal.fire("Your cart is empty. Please add items to cart");
    return;
  } else {
   window.location.href = "ordersuccess.html";
localStorage.removeItem("cart");
  }
}
