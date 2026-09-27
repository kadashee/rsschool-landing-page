const sliderTrack = document.querySelector('.slider-track');
const slides = sliderTrack.children;
const [prevButton, nextButton] = document.querySelectorAll('.slider-controls button');

let currentIndex = 0;

function getMaxIndex() {
  const visibleCount = window.innerWidth <= 768 ? 1 : 3;

  return slides.length - visibleCount;
}

function updateSlider() {
  const gap = parseFloat(getComputedStyle(sliderTrack).gap);
  const offset = currentIndex * (slides[0].offsetWidth + gap);

  sliderTrack.style.transform = `translateX(-${offset}px)`;
}

nextButton.addEventListener('click', () => {
  currentIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
  updateSlider();
});

prevButton.addEventListener('click', () => {
  currentIndex = currentIndex <= 0 ? getMaxIndex() : currentIndex - 1;
  updateSlider();
});

window.addEventListener('resize', () => {
  currentIndex = Math.min(currentIndex, getMaxIndex());
  updateSlider();
});
