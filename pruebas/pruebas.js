document.addEventListener("DOMContentLoaded", () => {
  console.log("academia.js listo ✅");
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("academia.js cargado ✅");

  const contacto = document.querySelector(".menu-item.contacto");
  const texto = contacto.querySelector(".menu-text");

  contacto.addEventListener("mouseenter", () => {
    texto.textContent = "963666205";
  });

  contacto.addEventListener("mouseleave", () => {
    texto.textContent = "Contacto";
  });
});

// ======= Hamburguesa mejorada (toggle visible/oculto) =======
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const sideMenu = document.getElementById("sideMenu");
  const closeBtn = document.getElementById("closeMenu");
  const overlay = document.getElementById("overlay");

  function openMenu() {
    hamburger.classList.add("active"); // oculta la hamburguesa
    sideMenu.classList.add("active");
    overlay.classList.add("active");
  }

  function closeMenu() {
    hamburger.classList.remove("active"); // vuelve a mostrar la hamburguesa
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  }

  hamburger.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});



// =========================
// 🎠 CARRUSEL CON DESLIZAMIENTO SUAVE
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
 const prevBtn = document.querySelector(".carousel-arrow.prev");
const nextBtn = document.querySelector(".carousel-arrow.next");
  const container = document.querySelector(".carousel-container");

  let current = 0;
  let interval;

 function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  container.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  current = index;

  // === Cambiar flechas dinámicamente según la imagen activa ===
  const arrowImages = [
    { prev: "../../img/academia/flecha-azul-izquierda.svg", next: "../../img/academia/flecha-azul-derecha.svg" },
    { prev: "../../img/academia/flecha-celeste-izquierda.svg", next: "../../img/academia/flecha-celeste-derecha.svg" },
    { prev: "../../img/academia/flecha-verde-izquierda.svg", next: "../../img/academia/flecha-verde-derecha.svg" },
    { prev: "../../img/academia/flecha-roja-izquierda.svg", next: "../../img/academia/flecha-roja-derecha.svg" },
    { prev: "../../img/academia/flecha-morada-izquierda.svg", next: "../../img/academia/flecha-morada-derecha.svg" },
  ];

  // 💫 Efecto de cambio suave de flechas
prevBtn.classList.add("change");
nextBtn.classList.add("change");

setTimeout(() => {
  prevBtn.src = arrowImages[index].prev;
  nextBtn.src = arrowImages[index].next;
  prevBtn.classList.remove("change");
  nextBtn.classList.remove("change");
}, 150);

}

  function nextSlide() {
    showSlide(current + 1);
  }

  function prevSlide() {
    showSlide(current - 1);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      showSlide(parseInt(dot.dataset.index));
    });
  });

  function startAutoSlide() {
    interval = setInterval(nextSlide, 10000);
  }
  function stopAutoSlide() {
    clearInterval(interval);
  }

  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  showSlide(0);
  startAutoSlide();
});

