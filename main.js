// 12 Professional Products Data
const products = [
    { id: 1, name: "Mechanical Keyboard", price: 4999, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400" },
    { id: 2, name: "Gaming Mouse RGB", price: 2499, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400" },
    { id: 3, name: "4K Gaming Monitor", price: 28999, img: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=400" },
    { id: 4, name: "Wireless Headset", price: 5999, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400" },
    { id: 5, name: "RTX 4080 GPU", price: 115000, img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=400" },
    { id: 6, name: "Gaming PC Case", price: 8500, img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=400" },
    { id: 7, name: "External SSD 1TB", price: 7200, img: "https://images.unsplash.com/photo-1597872200370-499df51bbd30?q=80&w=400" },
    { id: 8, name: "Streaming Webcam", price: 4500, img: "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=400" },
    { id: 9, name: "Gaming Chair", price: 15999, img: "https://images.unsplash.com/photo-1598550476439-6847785fce66?q=80&w=400" },
    { id: 10, name: "Liquid CPU Cooler", price: 10500, img: "https://images.unsplash.com/photo-1587202392420-f1c5d0e74f4b?q=80&w=400" },
    { id: 11, name: "16GB DDR5 RAM", price: 6500, img: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=400" },
    { id: 12, name: "Gaming Microphone", price: 8999, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400" }
];

// Display products on index page
const container = document.getElementById('product-container');
if (container) {
    products.forEach(p => {
        container.innerHTML += `
            <div class="card" data-tilt>
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>₹${p.price.toLocaleString()}</p>
                <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    });
    // Initialize 3D Tilt after cards are added
    VanillaTilt.init(document.querySelectorAll(".card"), { max: 15, speed: 400, glare: true, "max-glare": 0.2 });
}

// Cart System
let cart = JSON.parse(localStorage.getItem('blackbox_cart')) || [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('blackbox_cart', JSON.stringify(cart));
    updateCartCount();
    alert(product.name + " added to cart!");
}

function updateCartCount() {
    const count = document.getElementById('cart-count');
    if (count) count.innerText = cart.length;
}

function displayCart() {
    const cartList = document.getElementById('cart-items-list');
    const totalPrice = document.getElementById('total-price');
    if (!cartList) return;

    if (cart.length === 0) {
        cartList.innerHTML = "<h3>Your cart is empty.</h3>";
        totalPrice.innerText = "0";
        return;
    }

    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartList.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toLocaleString()}</p>
                </div>
                <button class="btn" onclick="removeFromCart(${index})" style="color: #ff4757;">Remove</button>
            </div>
        `;
    });
    totalPrice.innerText = total.toLocaleString();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('blackbox_cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function checkout() {
    if(cart.length === 0) return alert("Cart is empty!");
    alert("Order Placed Successfully!");
    cart = [];
    localStorage.removeItem('blackbox_cart');
    displayCart();
    updateCartCount();
}

// Initial count setup
updateCartCount();
