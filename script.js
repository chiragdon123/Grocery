let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () =>
{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () =>
{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');
document.querySelector('#login-btn').onclick = () =>
{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () =>
{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onsrcoll = () =>
{
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.toggle('active');
}

var swiper = new Swiper(".reviews-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay:{
        delay:2500,
        disableOnInteraction:false,
    },
    breakpoints: {
    0: {
        slidesPerView: 1,
    },
    768: {
        slidesPerView: 2,
    },
    1020: {
        slidesPerView: 3,
    },
    },
});


var swiper = new Swiper(".product-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay:{
        delay:2500,
        disableOnInteraction:false,
    },
    breakpoints: {
    0: {
        slidesPerView: 1,
    },
    768: {
        slidesPerView: 2,
    },
    1020: {
        slidesPerView: 3,
    },
    },
});


document.getElementById("login-btn").addEventListener("click",function(){
    window.location.href = "login.html";
});

document.getElementById("cart-btn").addEventListener("click",function(){
    window.location.href = "cart.html";
});



document.addEventListener('DOMContentLoaded', () =>{
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const CartItemCount = document.querySelector('.cart-icon span');
    const CartItemList = document.querySelector('.cart-items');
    const CartTotal = document.querySelector('.cart-total');
    const CartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () =>{
            const item = {
                name: document.querySelectorAll('.cart .card-title')[index].textContent,
                price: parseFloat(
                    document.querySelectorAll('.price')[index].textContent.slice(1),
                ),
                quantity: 1,           
            };

            const existingItem = cartItems.find(
                (cartItem) => cartItem.name === item.name,
            );
            if (existingItem){
                existingItem.quantity++;
            }
            else{
                cartItems.push(item);
            }

            totalAmount += item.price;

            upadateCartUI();
        });

        function upadateCartUI(){
            upadateCartItemCount(cartItems.length);
            upadateCartItemList();
            upadateCartTotal();
        }

        function upadateCartItemCount(count){
            CartItemCount.textContent = count;
        }

        function upadateCartItemList(){
            CartItemList.innerHTML = '';
            cartItems.forEach((item, index)=>{
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item', 'individual-cart-item');
                cartItem.innerHTML = `
                <span>(${item.quantity}x)${item.name}</span>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2,
                )}
                <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-times"></i></button>
                </span>
                `;

                cartItemsList.append(cartItem);
            });

            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach((button) =>{
                button.addEventListener('click', (event) =>{
                    const index = event.target.dataset.index;
                    removeItemFromCart(index);
                });
            });
        }

        function removeItemFromCart(index){
            const removeItem = cartItems.splice(index, 1)[0];
            totalAmount -= removeItem.price * removeItem.quantity;
            upadateCartUI();
        }

        function upadateCartTotal(){
            CartTotal.textContent = `$${totalAmount.toFixed(2)}`;
        }

        CartIcon.addEventListener('click', () =>{
            sidebar.classList.toggle('open');
        });

        const closeButton = document.querySelector('.sidebar-closed');
        closeButton.addEventListener('click',()=>{
            sidebar.classList.remove('open');
        });
    });
});