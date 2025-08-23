// =========================
// Copy Buttons
// =========================
document.getElementById('copyEmail').addEventListener('click', () => {
  navigator.clipboard.writeText(document.getElementById('email').textContent);
  alert('Email copied!');
});

document.getElementById('copyPhone').addEventListener('click', () => {
  navigator.clipboard.writeText(document.getElementById('phone').textContent);
  alert('Phone number copied!');
});

// =========================
// Products Section (Starfield)
// =========================
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();

const stars = [];
const numStars = 50;

class Star {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 0.5;
    this.dx = (Math.random() - 0.5) * 0.4;
    this.dy = (Math.random() - 0.5) * 0.4;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#d4c18a';
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#d4c18a';
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
    this.draw();
  }
}

for (let i = 0; i < numStars; i++) stars.push(new Star());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => star.update());
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  resizeCanvas();
  // keep stars in bounds on resize
  stars.forEach(s => {
    s.x = Math.min(s.x, canvas.width);
    s.y = Math.min(s.y, canvas.height);
  });
});

// =========================
/* Clickable Product Popups */
// =========================
const products = [
  {img:'https://i.postimg.cc/Pf0jsTf2/Whats-App-Image-2025-08-19-at-23-58-29-257312fc.jpg', title:'Lunar Serene', quote:'Experience Jasmine Fragrance, first unique drop of Lunar Wish'},
  {img:'https://i.postimg.cc/6Q8cXJpf/Whats-App-Image-2025-08-19-at-23-58-29-be4994ac.jpg', title:'Ekanto Golap', quote:'Most sold, Most craved unique Blueberry CheesCake Fragrance by Lunar Wish'},
  {img:'https://i.postimg.cc/bJXBVN9t/Whats-App-Image-2025-08-19-at-23-58-30-452a22e0.jpg', title:'Red Thread', quote:'Red Thread — A Scent of Destiny, Coming Soon from Lunar Wish'},
  {img:'https://i.postimg.cc/qMZQZvkv/Whats-App-Image-2025-08-19-at-23-58-30-21def77c.jpg', title:'Rain In Dhaka', quote:'Rain In Dhaka — Where Tradition Meets Modern Elegance. Coming Soon'}
];

canvas.addEventListener('click', () => {
  const product = products[Math.floor(Math.random() * products.length)];
  document.getElementById('productImg').src = product.img;
  document.getElementById('productName').textContent = product.title;
  document.getElementById('productQuote').textContent = product.quote;
  document.getElementById('productPopup').classList.remove('hidden');
});

function closePopup() {
  document.getElementById('productPopup').classList.add('hidden');
}
window.closePopup = closePopup; // expose to inline onclick

// =========================
// Revenue Circles Animation
// =========================
function animateCircles() {
  const circles = document.querySelectorAll('.circle');
  circles.forEach(circle => {
    const circleEl = circle.querySelectorAll('circle')[1];
    const percent = parseFloat(circle.dataset.percent);
    const offset = 314 - (314 * percent);
    circleEl.style.strokeDashoffset = offset;
  });
}
window.addEventListener('load', animateCircles);

// =========================
// Wish Journey: build tracks + click-to-cycle
// =========================
function initJourney() {
  document.querySelectorAll('.journey-box').forEach(box => {
    const urls = (box.getAttribute('data-images') || '').split(',').map(s => s.trim()).filter(Boolean);
    if (!urls.length) return;

    // Build track if not present
    let track = box.querySelector('.journey-track');
    if (!track) {
      track = document.createElement('div');
      track.className = 'journey-track';
      box.appendChild(track);
      urls.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Wish Journey Image ${i + 1}`;
        track.appendChild(img);
      });
    }

    // State
    box.dataset.index = box.dataset.index || '0';

    // Click / keyboard to advance
    const advance = () => {
      const current = parseInt(box.dataset.index || '0', 10);
      const next = (current + 1) % urls.length;
      box.dataset.index = String(next);
      track.scrollTo({ left: box.clientWidth * next, behavior: 'smooth' });
    };

    box.addEventListener('click', advance);
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        advance();
      }
    });

    // Keep position on resize
    window.addEventListener('resize', () => {
      const idx = parseInt(box.dataset.index || '0', 10);
      track.scrollTo({ left: box.clientWidth * idx, behavior: 'instant' });
    });
  });
}
initJourney();
