// 12 Products Data
const products = [
    { id: 1, name: "RGB Mechanical Keyboard", price: 4500, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400" },
    { id: 2, name: "Wireless Gaming Mouse", price: 2200, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400" },
    { id: 3, name: "4K Curved Monitor", price: 25000, img: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=400" },
    { id: 4, name: "Gaming Headset 7.1", price: 3500, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400" },
    { id: 5, name: "RTX 4090 GPU", price: 155000, img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=400" },
    { id: 6, name: "16GB DDR5 RAM", price: 8000, img: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=400" },
    { id: 7, name: "2TB NVMe SSD", price: 12000, img: "https://images.unsplash.com/photo-1597872200370-499df51bbd30?q=80&w=400" },
    { id: 8, name: "Liquid CPU Cooler", price: 9500, img: "https://images.unsplash.com/photo-1587202392420-f1c5d0e74f4b?q=80&w=400" },
    { id: 9, name: "Gaming Chair Black", price: 18000, img: "https://images.unsplash.com/photo-1598550476439-6847785fce66?q=80&w=400" },
    { id: 10, name: "Webcam 1080p Pro", price: 4000, img: "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=400" },
    { id: 11, name: "Microphone Condenser", price: 6500, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400" },
    { id: 12, name: "RGB Mousepad XL", price: 1500, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=400" }
];

// Display Products on Index Page
const productList = document.getElementById('product-list');
if (productList) {
    products.forEach(p => {
        productList.innerHTML += `
            <div class="card" data-tilt>
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <button class="btn" onclick="addToCart(${p.id})">Add To Cart</button>
            </div>
        `;
    });
    // Initialize 3D Tilt
    VanillaTilt.init(document.querySelectorAll(".card"), { max: 15, speed: 400, glare: true, "max-glare": 0.2 });
}

// Cart Logic
let cart = JSON.parse(localStorage.getItem('blackbox_cart')) || [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('blackbox_cart', JSON.stringify(cart));
    updateCartCount();
    alert(product.name + " added to cart!");
}

function updateCartCount() {
    const countSpan = document.getElementById('cart-count');
    if (countSpan) countSpan.innerText = cart.length;
}

// Display Cart Items in cart.html
function displayCart() {
    const container = document.getElementById('cart-items-container');
    const totalSpan = document.getElementById('total-price');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = "<h3>Your cart is empty</h3>";
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
                    <p>₹${item.price}</p>
                </div>
                <button class="btn" onclick="removeFromCart(${index})" style="color: #ff4d4d;">Remove</button>
            </div>
        `;
    });
    totalSpan.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('blackbox_cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

updateCartCount();
