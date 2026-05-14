// === SkillBridge — Pure JS ===

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Animated counters
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased).toLocaleString('pt-BR');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterIO.observe(c));

// Pitch deck carousel
const slides = document.querySelectorAll('.slide');
const counter = document.getElementById('counter');
let idx = 0;
const render = () => {
  slides.forEach((s, i) => s.classList.toggle('active', i === idx));
  counter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
};
document.getElementById('prev').onclick = () => { idx = (idx - 1 + slides.length) % slides.length; render(); };
document.getElementById('next').onclick = () => { idx = (idx + 1) % slides.length; render(); };
// auto-advance
setInterval(() => { idx = (idx + 1) % slides.length; render(); }, 6500);
render();

// Smooth focus on hash links (already CSS smooth)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
  });
});
