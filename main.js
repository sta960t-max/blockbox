// ======= LOADER =======
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    startAnimations();
  }, 2200);
});

// ======= PARTICLES =======
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      width:${Math.random()*4+1}px;
      height:${Math.random()*4+1}px;
      animation-delay:${Math.random()*5}s;
      animation-duration:${Math.random()*10+8}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ======= NAVBAR =======
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const bottom = top + sec.offsetHeight;
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link && window.scrollY >= top && window.scrollY < bottom) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

// ======= SMOOTH SCROLL =======
function scrollTo(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    scrollTo(a.getAttribute('href'));
  });
});

// ======= COUNTER ANIMATION =======
function startAnimations() {
  animateCounters();
}

function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 25);
  });
}

// ======= INTERSECTION OBSERVER =======
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.neu-card, .feat-card, .cat-card').forEach(el => observer.observe(el));

// ======= PRODUCTS =======
let currentFilter = 'all';
let visibleCount = 8;

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const filtered = currentFilter === 'all'
    ? productsData
    : productsData.filter(p => p.category === currentFilter);
  const toShow = filtered.slice(0, visibleCount);
  grid.innerHTML = toShow.map(p => `
    <div class="product-card neu-card reveal" data-cat="${p.category}">
      ${p.badge ? `<div class="prod-badge">${p.badge}</div>` : ''}
      <div class="prod-icon-wrap">
        <i class="fas ${p.icon}"></i>
        <div class="prod-glow"></div>
      </div>
      <div class="prod-info">
        <h3>${p.name}</h3>
        <p class="prod-desc">${p.desc}</p>
        <div class="prod-rating">
          ${getStars(p.rating)} <span>${p.rating} (${p.reviews})</span>
        </div>
        <div class="prod-price-row">
          <div class="prod-price">
            <span class="new-price">₹${p.price.toLocaleString()}</span>
            ${p.oldPrice ? `<span class="old-price">₹${p.oldPrice.toLocaleString()}</span>` : ''}
          </div>
          <button class="btn-cart neu-btn" onclick="addToCart('${p.name}', ${p.price})">
            <i class="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // reveal
  setTimeout(() => {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  }, 50);

  document.getElementById('loadMore').style.display =
    toShow.length < filtered.length ? 'inline-flex' : 'none';
}

function getStars(rating) {
  let s = '';
  for (let i = 1; i <= 5; i++) {
    s += `<i class="fas fa-star${i > Math.floor(rating) ? (i - rating < 1 ? '-half-alt' : '') : ''}" style="color:${i <= Math.floor(rating) ? '#f59e0b' : (i - rating < 1 && i > Math.floor(rating) ? '#f59e0b' : '#555')}"></i>`;
  }
  return s;
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    visibleCount = 8;
    renderProducts();
  });
});

function filterProducts(cat) {
  currentFilter = cat;
  visibleCount = 8;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === cat);
  });
  renderProducts();
  scrollTo('#products');
}

document.getElementById('loadMore').addEventListener('click', () => {
  visibleCount += 4;
  renderProducts();
});

renderProducts();

// ======= CART =======
let cart = [];

function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) existing.qty++;
  else cart.push({ name, price, qty: 1 });
  updateCart();
  showToast(`✅ ${name} added to cart!`);
}

function updateCart() {
  const count = cart.reduce((a, i) => a + i.qty, 0);
  const total = cart.reduce((a, i) => a + i.price * i.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = `₹${total.toLocaleString()}`;

  const cartItems = document.getElementById('cartItems');
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-cart"></i><p>Your cart is empty</p></div>';
    return;
  }
  cartItems.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="ci-info">
        <p>${item.name}</p>
        <span>₹${item.price.toLocaleString()} × ${item.qty}</span>
      </div>
      <div class="ci-controls">
        <button class="neu-btn sm" onclick="changeQty(${idx},-1)">−</button>
        <span>${item.qty}</span>
        <button class="neu-btn sm" onclick="changeQty(${idx},1)">+</button>
        <button class="neu-btn sm" onclick="removeItem(${idx})"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function changeQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCart();
}

function removeItem(idx) {
  cart.splice(idx, 1);
  updateCart();
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

document.getElementById('cartBtn').addEventListener('click', toggleCart);

function checkout() {
  if (cart.length === 0) { showToast('🛒 Cart is empty!'); return; }
  showToast('🎉 Order placed successfully! Thank you!');
  cart = [];
  updateCart();
  toggleCart();
}

// ======= COUNTDOWN =======
function updateCountdown() {
  const end = new Date();
  end.setHours(end.getHours() + 5, end.getMinutes() + 30, 0);
  let stored = localStorage.getItem('bbDealEnd');
  const dealEnd = stored ? new Date(stored) : (() => {
    const d = new Date(); d.setHours(d.getHours() + 5, d.getMinutes() + 30, 0);
    localStorage.setItem('bbDealEnd', d); return d;
  })();

  setInterval(() => {
    const diff = dealEnd - new Date();
    if (diff <= 0) { document.getElementById('ctH').textContent = '00'; return; }
    const h = Math.floor(diff/3600000), m = Math.floor((diff%3600000)/60000), s = Math.floor((diff%60000)/1000);
    document.getElementById('ctH').textContent = String(h).padStart(2,'0');
    document.getElementById('ctM').textContent = String(m).padStart(2,'0');
    document.getElementById('ctS').textContent = String(s).padStart(2,'0');
  }, 1000);
}
updateCountdown();

// ======= NEWSLETTER =======
function subscribe() {
  const email = document.getElementById('nlEmail').value;
  if (!email || !email.includes('@')) { showToast('⚠️ Please enter a valid email!'); return; }
  showToast('🎉 Subscribed successfully! Welcome to Black Box.');
  document.getElementById('nlEmail').value = '';
}

// ======= CONTACT FORM =======
function submitForm(e) {
  e.preventDefault();
  showToast('✅ Message sent! We will get back to you shortly.');
  e.target.reset();
}

// ======= TOAST =======
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ======= 3D DEVICE TILT =======
const device = document.getElementById('floatingDevice');
document.addEventListener('mousemove', (e) => {
  if (!device) return;
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  const rx = (e.clientY - cy) / cy * 10;
  const ry = (e.clientX - cx) / cx * 10;
  device.style.transform = `rotateX(${-rx}deg) rotateY(${ry}deg)`;
});
