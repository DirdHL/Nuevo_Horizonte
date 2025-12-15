const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');

let index = 0;

setInterval(() => {
  index = (index + 1) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
}, 4000);

const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "flex";
    modalTitle.textContent = card.dataset.title;
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
