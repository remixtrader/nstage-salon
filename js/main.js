/* ====== PRELOADER ====== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 2000);
});

/* ====== CURSOR GLOW ====== */
const cursor = document.getElementById('cursorGlow');
if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

/* ====== NAVBAR ====== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('active');
    navMenu?.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 80);
});

/* Active nav link on scroll */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* ====== COUNTER ANIMATION ====== */
const counters = document.querySelectorAll('.stat-num');
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const increment = target / 60;
    let current = 0;
    const update = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    update();
  });
}

/* ====== SCROLL REVEAL ====== */
function isInView(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - 80 && rect.bottom > 0;
}

const revealElements = document.querySelectorAll('.section-header, .about-grid, .service-cards-3d, .team-grid, .gallery-grid, .booking-wrapper, .testimonials-slider, .footer-grid');

function checkReveal() {
  revealElements.forEach(el => {
    if (isInView(el)) {
      el.classList.add('visible');
      if (el.classList.contains('section-header') && !countersStarted) {
        animateCounters();
      }
    }
  });
}

revealElements.forEach(el => el.classList.add('reveal'));

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

/* ====== SERVICE TABS ====== */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.service-cards-3d');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    tabContents.forEach(content => {
      content.classList.toggle('active', content.dataset.tab === tab);
    });
  });
});

/* ====== TESTIMONIALS SLIDER ====== */
const slides = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('testiPrev');
const nextBtn = document.getElementById('testiNext');
const dotsContainer = document.querySelector('.testi-dots');
let currentSlide = 0;

if (slides.length && dotsContainer) {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('testi-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.testi-dot').forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.testi-dot')[currentSlide]?.classList.add('active');
  }

  prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));

  setInterval(() => goToSlide(currentSlide + 1), 5000);
}

/* ====== BOOKING FORM ====== */
const bookingForm = document.getElementById('bookingForm');
bookingForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = bookingForm.querySelector('.btn-submit');
  const original = btn.innerHTML;
  btn.innerHTML = '<span>Réservation envoyée ✓</span>';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.pointerEvents = '';
    bookingForm.reset();
  }, 3000);
});

/* ====== BACK TO TOP ====== */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 600);
});
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ====== PARALLAX HERO ====== */
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

/* ====== 3D CARDS TILT ====== */
document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.querySelector('.card-3d-inner').style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    const inner = card.querySelector('.card-3d-inner');
    inner.style.transform = 'rotateX(0) rotateY(0)';
    setTimeout(() => { inner.style.transition = ''; }, 300);
  });
});

console.log('Nstage Salon – Site chargé avec succès !');
