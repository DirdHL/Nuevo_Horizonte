    /* ─────────────────────────────
    HEADER MENU
    ───────────────────────────── */
    const btnMenu = document.querySelector(".btn-izquierda");
    const barra = document.querySelector(".rectangulo-superior");

    btnMenu.addEventListener("click", () => {
    barra.classList.toggle("expandido");
    });


  const track = document.querySelector('.carousel-track');
const items = Array.from(document.querySelectorAll('.img-box'));

const spacing = 420;  
const speed = 0.005;   
let progress = 0;

function animate() {
  progress += speed;

  items.forEach((item, i) => {

    const x = ((i - progress) * spacing);

    const index = x / spacing;

    const y = Math.abs(index) ** 2 * 120;
    const rotate = index * 10;

    // ocultar lejos
    if (Math.abs(index) > 4) {
      item.style.opacity = 0;
      return;
    }

    item.style.opacity = 1;
    item.style.transform = `
      translate(-50%, -50%)
      translateX(${x}px)
      translateY(${y}px)
      rotate(${rotate}deg)
    `;

    item.style.zIndex = 100 - Math.abs(index);
  });

  requestAnimationFrame(animate);
}

animate();
