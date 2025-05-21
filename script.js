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