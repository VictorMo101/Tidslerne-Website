let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let autoAdvanceTimer = null;

function showSlide(idx, direction = 1) {
  if (idx === currentSlide) return;

  const prevSlide = slides[currentSlide];
  const nextSlide = slides[idx];

  // Prepare next slide position
  nextSlide.style.display = 'flex';
  nextSlide.style.position = 'absolute';
  nextSlide.style.left = '0';
  nextSlide.style.top = '0';
  nextSlide.style.width = '100%';
  nextSlide.style.zIndex = '2';
  nextSlide.style.transform = `translateX(${direction > 0 ? '100%' : '-100%'})`;

  // Animate previous slide out
  anime({
    targets: prevSlide,
    translateX: [ '0%', direction > 0 ? '-100%' : '100%' ],
    duration: 600,
    easing: 'easeInOutQuad',
    complete: function() {
      prevSlide.style.display = 'none';
      prevSlide.style.transform = '';
      prevSlide.style.position = '';
      prevSlide.style.zIndex = '';
    }
  });

  // Animate next slide in
  anime({
    targets: nextSlide,
    translateX: [ direction > 0 ? '100%' : '-100%', '0%' ],
    duration: 600,
    easing: 'easeInOutQuad',
    complete: function() {
      nextSlide.style.transform = '';
      nextSlide.style.position = '';
      nextSlide.style.zIndex = '';
    }
  });

  slides.forEach((slide, i) => {
    indicators[i].classList.toggle('active', i === idx);
  });
  currentSlide = idx;
  resetAutoAdvance();
}

function moveSlide(dir) {
  let next = (currentSlide + dir + slides.length) % slides.length;
  showSlide(next, dir);
}

function goToSlide(idx) {
  const dir = idx > currentSlide ? 1 : -1;
  showSlide(idx, dir);
}

function autoAdvance() {
  autoAdvanceTimer = setTimeout(() => {
    moveSlide(1);
  }, 5000); 
}

function resetAutoAdvance() {
  clearTimeout(autoAdvanceTimer);
  autoAdvance();
}

// Initialize
slides.forEach((slide, i) => {
  slide.style.display = i === 0 ? 'flex' : 'none';
});
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