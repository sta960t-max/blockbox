const products = [
    { id: 1, name: "RGB Mechanical Keyboard", price: 4999, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400", desc: "Customizable RGB lighting with tactile mechanical switches for pro-gaming." },
    { id: 2, name: "Wireless Pro Mouse", price: 2499, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400", desc: "Ultra-fast wireless connection with 25k DPI precision sensor." },
    { id: 3, name: "4K Curved Monitor", price: 28999, img: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=400", desc: "32-inch 4K UHD display with 144Hz refresh rate and immersive curvature." },
    { id: 4, name: "Gaming Headset 7.1", price: 5999, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400", desc: "Surround sound 7.1 with noise-cancelling mic and memory foam ear pads." },
    { id: 5, name: "RTX 4070 GPU", price: 65000, img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=400", desc: "Ultimate ray tracing performance with 12GB GDDR6X memory." },
    { id: 6, name: "Liquid CPU Cooler", price: 12000, img: "https://images.unsplash.com/photo-1587202392420-f1c5d0e74f4b?q=80&w=400", desc: "360mm ARGB radiator for extreme cooling during heavy tasks." },
    { id: 7, name: "1TB NVMe SSD", price: 8500, img: "https://images.unsplash.com/photo-1597872200370-499df51bbd30?q=80&w=400", desc: "Lightning fast boot times with up to 7000MB/s read speeds." },
    { id: 8, name: "Gaming Cabinet", price: 7500, img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=400", desc: "Tempered glass case with optimized airflow and pre-installed RGB fans." },
    { id: 9, name: "Ergonomic Chair", price: 18999, img: "https://images.unsplash.com/photo-1598550476439-6847785fce66?q=80&w=400", desc: "Multi-adjustable armrests and lumbar support for long gaming hours." },
    { id: 10, name: "HD Streaming Webcam", price: 4500, img: "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=400", desc: "1080p 60fps crystal clear video with dual noise-cancelling mics." },
    { id: 11, name: "Studio Microphone", price: 9999, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400", desc: "Professional condenser mic for streaming and high-quality recording." },
    { id: 12, name: "32GB DDR5 RAM", price: 14000, img: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=400", desc: "Dual channel 6000MHz memory for seamless multitasking." }
];

let cart = JSON.parse(localStorage.getItem('blackbox_cart')) || [];

// Render Index
const list = document.getElementById('product-list');
if (list) {
    products.forEach(p => {
        list.innerHTML += `
            <div class="card" data-tilt>
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p>₹${p.price.toLocaleString()}</p>
                <button class="btn small-btn" onclick="openDetails(${p.id})">Details</button>
                <button class="btn" onclick="addToCart(${p.id})">Buy</button>
            </div>`;
    });
    VanillaTilt.init(document.querySelectorAll(".card"), { max: 15, speed: 400 });
}

function openDetails(id) {
    const p = products.find(i => i.id === id);
    document.getElementById('modal-body').innerHTML = `
        <div class="modal-flex">
            <img src="${p.img}">
            <div class="modal-info">
                <h2>${p.name}</h2>
                <p style="font-size:1.5rem; margin:10px 0;">₹${p.price.toLocaleString()}</p>
                <p style="color:#666; margin-bottom:20px;">${p.desc}</p>
                <button class="btn" onclick="addToCart(${p.id}); closeModal();">Add To Cart</button>
            </div>
        </div>`;
    document.getElementById('productModal').style.display = "flex";
}
function closeModal() { document.getElementById('productModal').style.display = "none"; }

function addToCart(id) {
    cart.push(products.find(i => i.id === id));
    localStorage.setItem('blackbox_cart', JSON.stringify(cart));
    updateCartCount();
}
function updateCartCount() { 
    const el = document.getElementById('cart-count');
    if (el) el.innerText = cart.length;
}

function displayCart() {
    const cont = document.getElementById('cart-items-container');
    const tot = document.getElementById('total-price');
    if (!cont) return;
    cont.innerHTML = cart.length ? "" : "<h3>Cart is Empty</h3>";
    let sum = 0;
    cart.forEach((item, i) => {
        sum += item.price;
        cont.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                <button class="btn" onclick="remove(${i})" style="color:red">X</button>
            </div>`;
    });
    tot.innerText = sum.toLocaleString();
}
function remove(i) { cart.splice(i, 1); localStorage.setItem('blackbox_cart', JSON.stringify(cart)); displayCart(); updateCartCount(); }
function checkout() { alert("Order Placed!"); cart = []; localStorage.clear(); location.href="index.html"; }

updateCartCount();
