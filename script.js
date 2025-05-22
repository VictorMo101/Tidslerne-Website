let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let autoAdvanceTimer = null;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
    indicators[i].classList.toggle('active', i === idx);
  });
  currentSlide = idx;
  resetAutoAdvance();
}

function moveSlide(dir) {
  let next = (currentSlide + dir + slides.length) % slides.length;
  showSlide(next);
}

function goToSlide(idx) {
  showSlide(idx);
}

function autoAdvance() {
  autoAdvanceTimer = setTimeout(() => {
    moveSlide(1);
  }, 10000); 
}

function resetAutoAdvance() {
  clearTimeout(autoAdvanceTimer);
  autoAdvance();
}

// Initialize
showSlide(0);
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