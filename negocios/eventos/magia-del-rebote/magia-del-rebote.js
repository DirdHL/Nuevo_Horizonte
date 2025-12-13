const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');

let index = 0;

setInterval(() => {
  index = (index + 1) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
}, 4000);
