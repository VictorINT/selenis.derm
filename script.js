// Meniu mobil + utilitare simple
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const yearEl = document.getElementById('year');
const header = document.querySelector('.site-header');
const slider = document.querySelector('.team-slider');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.classList.toggle('open');
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  
  // Închide meniul când se apasă pe backdrop
  siteNav.addEventListener('click', (e) => {
    if (e.target === siteNav || e.target.tagName === 'A') {
      siteNav.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Scroll lin activ pe link-urile nav
siteNav?.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id ? document.querySelector(id) : null;
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      siteNav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Validare minimală formular
const form = document.getElementById('booking-form');
const requiredFields = ['name', 'phone', 'email', 'service'];

function setError(name, msg) {
  const small = document.querySelector(`[data-error-for="${name}"]`);
  if (small) small.textContent = msg || '';
}

function validate() {
  let ok = true;
  requiredFields.forEach((f) => {
    const el = document.getElementById(f);
    const value = el?.value?.trim();
    let msg = '';
    if (!value) { msg = 'Câmp obligatoriu'; ok = false; }
    else if (f === 'email' && !/^\S+@\S+\.\S+$/.test(value)) { msg = 'Email invalid'; ok = false; }
    else if (f === 'phone' && !/^[0-9\s\-+]{9,}$/.test(value)) { msg = 'Telefon invalid'; ok = false; }
    setError(f, msg);
  });
  return ok;
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const ok = validate();
  const success = form.querySelector('.success');
  if (ok) {
    success?.removeAttribute('hidden');
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    console.log('Cerere programare:', payload);
    form.reset();
    requiredFields.forEach(f => setError(f, ''));
  } else {
    success?.setAttribute('hidden', '');
  }
});

// Mic efect: umbră la scrol pentru header
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  if (!header) return;
  if (y > 10 && lastScroll <= 10) header.classList.add('scrolled');
  else if (y <= 10 && lastScroll > 10) header.classList.remove('scrolled');
  lastScroll = y;
});

// Scroll reveal: observă elementele cu data-reveal
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  const toReveal = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  toReveal.forEach(el => io.observe(el));
}

// Slider echipă simplu
if (slider) {
  const track = slider.querySelector('.slider-track');
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');
  let offset = 0;
  let step = 0;

  const computeStep = () => {
    if (!slides.length) return 0;
    const first = slides[0].getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0');
    return first.width + gap;
  };

  const clampOffset = () => {
    const maxOffset = Math.max(0, step * slides.length - slider.querySelector('.slider-window').clientWidth);
    offset = Math.min(Math.max(0, offset), maxOffset);
    track.style.transform = `translateX(-${offset}px)`;
    if (prevBtn) prevBtn.disabled = offset <= 0;
    if (nextBtn) nextBtn.disabled = offset >= maxOffset - 1;
  };

  const recalc = () => {
    step = computeStep();
    clampOffset();
  };

  prevBtn?.addEventListener('click', () => {
    offset -= step;
    clampOffset();
  });

  nextBtn?.addEventListener('click', () => {
    offset += step;
    clampOffset();
  });

  window.addEventListener('resize', recalc);
  recalc();
}
