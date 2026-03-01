// 12 Products Array with Details (Description)
const products = [
    { id: 1, name: "Premium RGB Keyboard", price: 4999, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400", desc: "Mechanical switches with 16.8M RGB colors. Dust-proof and highly durable for pro-gaming." },
    { id: 2, name: "Wireless Pro Mouse", price: 2499, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400", desc: "Ultra-lightweight design with 25K DPI sensor. 70 hours of battery life on a single charge." },
    { id: 3, name: "4K Curved Monitor", price: 28999, img: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=400", desc: "32-inch 4K UHD display with 144Hz refresh rate. 1500R curvature for immersive experience." },
    { id: 4, name: "Noise Cancelling Headset", price: 5999, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400", desc: "Active Noise Cancellation (ANC) with 50mm drivers. Memory foam ear cups for long sessions." },
    { id: 5, name: "RTX 4070 Graphics Card", price: 65000, img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=400", desc: "Powered by Ada Lovelace architecture. 12GB GDDR6X memory, Ray Tracing, and DLSS 3 support." },
    { id: 6, name: "Liquid CPU Cooler", price: 12000, img: "https://images.unsplash.com/photo-1587202392420-f1c5d0e74f4b?q=80&w=400", desc: "360mm radiator with ARGB fans. Silent pump technology for extreme overclocking cooling." },
    { id: 7, name: "1TB NVMe SSD", price: 8500, img: "https://images.unsplash.com/photo-1597872200370-499df51bbd30?q=80&w=400", desc: "Read speeds up to 7500MB/s. Perfect for fast boot times and heavy video editing work." },
    { id: 8, name: "Gaming PC Cabinet", price: 7500, img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=400", desc: "Tempered glass side panel with mesh front. Optimized airflow with 4 pre-installed RGB fans." },
    { id: 9, name: "Ergonomic Gaming Chair", price: 18999, img: "https://images.unsplash.com/photo-1598550476439-6847785fce66?q=80&w=400", desc: "Premium PU leather with 4D armrests. Reclines up to 180 degrees with lumbar support." },
    { id: 10, name: "Streaming Webcam 1080p", price: 4500, img: "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=400", desc: "Full HD 1080p at 60fps. Auto-focus with dual noise-reducing microphones for clear audio." },
    { id: 11, name: "Condenser Microphone", price: 9999, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400", desc: "Studio-quality recording with cardioid polar pattern. USB plug-and-play with gain control." },
    { id: 12, name: "DDR5 32GB RAM Kit", price: 14000, img: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=400", desc: "6000MHz ultra-fast speed. On-die ECC and XMP 3.0 support for maximum stability." }
];

let cart = JSON.parse(localStorage.getItem('blackbox_cart')) || [];

// 1. Index Page par Products Load karna
const productContainer = document.getElementById('product-list');
if (productContainer) {
    products.forEach(p => {
        productContainer.innerHTML += `
            <div class="card" data-tilt>
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>₹${p.price.toLocaleString()}</p>
                <div class="card-btns">
                    <button class="btn small-btn" onclick="openDetails(${p.id})">Details</button>
                    <button class="btn" onclick="addToCart(${p.id})">Buy Now</button>
                </div>
            </div>
        `;
    });
    VanillaTilt.init(document.querySelectorAll(".card"), { max: 15, speed: 400, glare: true, "max-glare": 0.2 });
}

// 2. View Details Modal Logic
function openDetails(id) {
    const p = products.find(prod => prod.id === id);
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modal-body');

    modalContent.innerHTML = `
        <div class="modal-flex">
            <img src="${p.img}" alt="${p.name}">
            <div class="modal-info">
                <h2>${p.name}</h2>
                <p class="modal-price">Price: ₹${p.price.toLocaleString()}</p>
                <p class="modal-desc">${p.desc}</p>
                <button class="btn" onclick="addToCart(${p.id}); closeModal();">Add to Cart</button>
            </div>
        </div>
    `;
    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById('productModal').style.display = "none";
}

// 3. Cart Functions
function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    localStorage.setItem('blackbox_cart', JSON.stringify(cart));
    updateCartCount();
    alert(item.name + " added to cart!");
}

function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.length;
}

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

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('blackbox_cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function checkout() {
    if (cart.length === 0) return alert("Cart is empty!");
    alert("Order Placed Successfully!");
    cart = [];
    localStorage.removeItem('blackbox_cart');
    window.location.href = "index.html";
}

updateCartCount();
