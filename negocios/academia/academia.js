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

// ======= Hamburguesa y menú lateral mejorados =======
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const sideMenu = document.getElementById("sideMenu");
  const closeBtn = document.getElementById("closeMenu");
  const overlay = document.getElementById("overlay");

  // Abrir menú
  function openMenu() {
    sideMenu.classList.add("active");
    hamburger.classList.add("active");
    overlay.classList.add("active");
  }

  // Cerrar menú
  function closeMenu() {
    sideMenu.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
  }

  // Eventos principales
  hamburger.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // 🔄 Sincroniza visibilidad del botón X y hamburguesa
  const observer = new MutationObserver(() => {
    if (sideMenu.classList.contains("active")) {
      hamburger.style.opacity = "0";
      hamburger.style.pointerEvents = "none";
      closeBtn.style.display = "flex";
    } else {
      hamburger.style.opacity = "1";
      hamburger.style.pointerEvents = "auto";
      closeBtn.style.display = "none";
    }
  });

  observer.observe(sideMenu, { attributes: true, attributeFilter: ["class"] });
});



// =========================
//  CARRUSEL CON DESLIZAMIENTO SUAVE
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
 const prevBtn = document.querySelector(".carousel-arrow.prev");
const nextBtn = document.querySelector(".carousel-arrow.next");
  const container = document.querySelector(".carousel-container");

  // =============================
// 🖼️ Cambio de imágenes según tamaño de pantalla (adaptativo)
// =============================
const imageSets = {
  400: [
    "../../img/academia/movil400-inicio.png",
    "../../img/academia/movil400-natacion.png",
    "../../img/academia/movil400-futbol.png",
    "../../img/academia/movil400-voley.png",
    "../../img/academia/movil400-danza.png"
  ],
  500: [
    "../../img/academia/movil500-inicio.png",
    "../../img/academia/movil500-natacion.png",
    "../../img/academia/movil500-futbol.png",
    "../../img/academia/movil500-voley.png",
    "../../img/academia/movil500-danza.png"
  ],
  600: [
    "../../img/academia/movil600-inicio.png",
    "../../img/academia/movil600-natacion.png",
    "../../img/academia/movil600-futbol.png",
    "../../img/academia/movil600-voley.png",
    "../../img/academia/movil600-danza.png"
  ],
  700: [
    "../../img/academia/movil700-inicio.png",
    "../../img/academia/movil700-natacion.png",
    "../../img/academia/movil700-futbol.png",
    "../../img/academia/movil700-voley.png",
    "../../img/academia/movil700-danza.png"
  ],
  800: [
    "../../img/academia/movil800-inicio.png",
    "../../img/academia/movil800-natacion.png",
    "../../img/academia/movil800-futbol.png",
    "../../img/academia/movil800-voley.png",
    "../../img/academia/movil800-danza.png"
  ],
  900: [
    "../../img/academia/movil900-inicio.png",
    "../../img/academia/movil900-natacion.png",
    "../../img/academia/movil900-futbol.png",
    "../../img/academia/movil900-voley.png",
    "../../img/academia/movil900-danza.png"
  ],
  1000: [
    "../../img/academia/movil1000-inicio.png",
    "../../img/academia/movil1000-natacion.png",
    "../../img/academia/movil1000-futbol.png",
    "../../img/academia/movil1000-voley.png",
    "../../img/academia/movil1000-danza.png"
  ],
   1100: [
    "../../img/academia/movil1100-inicio.png",
    "../../img/academia/movil1100-natacion.png",
    "../../img/academia/movil1100-futbol.png",
    "../../img/academia/movil1100-voley.png",
    "../../img/academia/movil1100-danza.png"
  ],
   1200: [
    "../../img/academia/movil1200-inicio.png",
    "../../img/academia/movil1200-natacion.png",
    "../../img/academia/movil1200-futbol.png",
    "../../img/academia/movil1200-voley.png",
    "../../img/academia/movil1200-danza.png"
  ],
  desktop: [
    "../../img/academia/academia-carrusel-inicio.png",
    "../../img/academia/carrusel-natacion.png",
    "../../img/academia/carrusel-futbol.png",
    "../../img/academia/carrusel-voley.png",
    "../../img/academia/carrusel-danza.png"
  ]
};

function getImageSet() {
  const width = window.innerWidth;
  if (width <= 400) return imageSets[400];
  if (width <= 500) return imageSets[500];
  if (width <= 600) return imageSets[600];
  if (width <= 700) return imageSets[700];
  if (width <= 800) return imageSets[800];
  if (width <= 900) return imageSets[900];
  if (width <= 1000) return imageSets[1000];
  if (width <= 1100) return imageSets[1100];
  if (width <= 1200) return imageSets[1200];
  return imageSets.desktop;
}

function updateCarouselImages() {
  const images = getImageSet();
  slides.forEach((slide, i) => {
    const img = slide.querySelector("img");
    img.src = images[i];
  });
}

// Llamar al cargar y cuando cambia el tamaño
updateCarouselImages();
window.addEventListener("resize", updateCarouselImages);


  let current = 0;
  let interval;

 function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  container.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  current = index;

  const arrowImages = [
    { prev: "../../img/academia/flecha-azul-izquierda.svg", next: "../../img/academia/flecha-azul-derecha.svg" },
    { prev: "../../img/academia/flecha-celeste-izquierda.svg", next: "../../img/academia/flecha-celeste-derecha.svg" },
    { prev: "../../img/academia/flecha-verde-izquierda.svg", next: "../../img/academia/flecha-verde-derecha.svg" },
    { prev: "../../img/academia/flecha-roja-izquierda.svg", next: "../../img/academia/flecha-roja-derecha.svg" },
    { prev: "../../img/academia/flecha-morada-izquierda.svg", next: "../../img/academia/flecha-morada-derecha.svg" },
  ];

prevBtn.classList.add("change");
nextBtn.classList.add("change");

setTimeout(() => {
  prevBtn.src = arrowImages[index].prev;
  nextBtn.src = arrowImages[index].next;
  prevBtn.classList.remove("change");
  nextBtn.classList.remove("change");
}, 150);

 // 🎨 Colores personalizados de los dots activos
  const dotColors = ["#042754", "#0099cc", "#185408", "#e80606", "#8000ff"];
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.style.backgroundColor = dotColors[index];
    } else {
      dot.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    }
  });

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
    interval = setInterval(nextSlide, 5000);
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

