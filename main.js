// Vanilla-tilt initialization
VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 15, // Maximum tilt angle
    speed: 400, // Transition speed
    glare: true, // Reflection effect
    "max-glare": 0.3,
});

// Click effect for buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Item added to cart!');
    });
});
