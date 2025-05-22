let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let autoAdvanceTimer = null;

function showSlide(idx, dir = 1) {
  if (idx === currentSlide) return;
  const prev = slides[currentSlide], next = slides[idx];

  next.style.display = 'flex';
  next.style.position = 'absolute';
  next.style.left = 0;
  next.style.width = '100%';
  next.style.transform = `translateX(${dir > 0 ? '100%' : '-100%'})`;

  anime({
    targets: prev,
    translateX: [0, dir > 0 ? '-100%' : '100%'],
    duration: 500,
    easing: 'easeInOutQuad',
    complete: () => { prev.style.display = 'none'; prev.style.transform = ''; }
  });

  anime({
    targets: next,
    translateX: [dir > 0 ? '100%' : '-100%', 0],
    duration: 500,
    easing: 'easeInOutQuad',
    complete: () => { next.style.transform = ''; next.style.position = ''; }
  });

  indicators.forEach((el, i) => el.classList.toggle('active', i === idx));
  currentSlide = idx;
  resetAutoAdvance();
}

function moveSlide(dir) {
  showSlide((currentSlide + dir + slides.length) % slides.length, dir);
}

function goToSlide(idx) {
  showSlide(idx, idx > currentSlide ? 1 : -1);
}

function autoAdvance() {
  autoAdvanceTimer = setTimeout(() => moveSlide(1), 5000);
}

function resetAutoAdvance() {
  clearTimeout(autoAdvanceTimer);
  autoAdvance();
}

// Init
slides.forEach((s, i) => s.style.display = i === 0 ? 'flex' : 'none');
autoAdvance();






  const menuToggle = document.querySelector('.menu-toggle');
  const dropdownNav = document.getElementById('dropdownNav');
  const overlay = document.getElementById('overlay');

  menuToggle.addEventListener('click', () => {
    const isOpen = dropdownNav.classList.contains('open');
    dropdownNav.classList.toggle('open', !isOpen);
    overlay.classList.toggle('show', !isOpen);
    document.body.classList.toggle('no-scroll', !isOpen);
  });

  overlay.addEventListener('click', () => {
    dropdownNav.classList.remove('open');
    overlay.classList.remove('show');
    document.body.classList.remove('no-scroll');
  });

  // Submenu toggle
  document.querySelectorAll('.menu-btn').forEach(button => {
    button.addEventListener('click', () => {
      const menuItem = button.parentElement;
      const submenu = menuItem.querySelector('.submenu');

      const isOpen = submenu.style.display === 'block';
      submenu.style.display = isOpen ? 'none' : 'block';
      menuItem.classList.toggle('open', !isOpen);
    });
  });

  // Scroll hide/reveal navbar
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    navbar.style.transition = 'transform 0.3s';
    lastScrollY = window.scrollY;
  });