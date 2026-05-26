// Card flip interaction
document.addEventListener('DOMContentLoaded', function () {
  const card = document.getElementById('prize-card');
  if (!card) return;
  card.addEventListener('click', function () {
    this.classList.toggle('flipped');
  });
});
