// 12 Products Array
const products = [
    { id: 1, name: "Premium RGB Keyboard", price: 4999, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400" },
    { id: 2, name: "Wireless Pro Mouse", price: 2499, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400" },
    { id: 3, name: "4K Curved Monitor", price: 28999, img: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=400" },
    { id: 4, name: "Noise Cancelling Headset", price: 5999, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400" },
    { id: 5, name: "RTX 4070 Graphics Card", price: 65000, img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=400" },
    { id: 6, name: "Liquid CPU Cooler", price: 12000, img: "https://images.unsplash.com/photo-1587202392420-f1c5d0e74f4b?q=80&w=400" },
    { id: 7, name: "1TB NVMe SSD", price: 8500, img: "https://images.unsplash.com/photo-1597872200370-499df51bbd30?q=80&w=400" },
    { id: 8, name: "Gaming PC Cabinet", price: 7500, img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=400" },
    { id: 9, name: "Ergonomic Gaming Chair", price: 18999, img: "https://images.unsplash.com/photo-1598550476439-6847785fce66?q=80&w=400" },
    { id: 10, name: "Streaming Webcam 1080p", price: 4500, img: "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=400" },
    { id: 11, name: "Condenser Microphone", price: 9999, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400" },
    { id: 12, name: "DDR5 32GB RAM Kit", price: 14000, img: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=400" }
];

// Initialize Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('blackbox_cart')) || [];

// Load Products on Index Page
const productContainer = document.getElementById('product-list');
if (productContainer) {
    products.forEach(p => {
        productContainer.innerHTML += `
            <div class="card" data-tilt>
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>₹${p.price.toLocaleString()}</p>
                <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    });
    // Vanilla Tilt 3D effect
    VanillaTilt.init(document.querySelectorAll(".card"), { max: 15, speed: 400, glare: true, "max-glare": 0.2 });
}

// Add to Cart Function
function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    localStorage.setItem('blackbox_cart', JSON.stringify(cart));
    updateCartCount();
    alert(item.name + " added to cart!");
}

// Update Nav Cart Count
function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.length;
}

// Display Items on Cart Page
function displayCart() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('total-price');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = "<h3 style='text-align:center;'>Your cart is empty!</h3>";
        totalEl.innerText = "0";
        return;
    }

    container.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toLocaleString()}</p>
                </div>
                <button class="btn" onclick="removeFromCart(${index})" style="color:red;">Remove</button>
            </div>
        `;
    });
    totalEl.innerText = total.toLocaleString();
}

// Remove Item
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('blackbox_cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Checkout
function checkout() {
    if (cart.length === 0) return alert("Cart is empty!");
    alert("Thank you! Your order has been placed.");
    cart = [];
    localStorage.removeItem('blackbox_cart');
    window.location.href = "index.html";
}

// Run on Load
updateCartCount();
