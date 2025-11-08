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
//  Cambio de imágenes según tamaño de pantalla (adaptativo)
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

// =========================
//  SECCIÓN ACADEMIA – Imagen Adaptativa
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const academiaImg = document.querySelector(".academia-img");

  const academiaImages = {
    400: "../../img/academia/academia400.png",
    500: "../../img/academia/academia500.png",
    600: "../../img/academia/academia600.png",
    700: "../../img/academia/academia700.png",
    800: "../../img/academia/academia800.png",
    900: "../../img/academia/academia900.png",
    1000: "../../img/academia/academia1000.png",
    1100: "../../img/academia/academia1100.png",
    1200: "../../img/academia/academia1200.png",
    desktop: "../../img/academia/academia2000.png"
  };

  function getAcademiaImage() {
    const width = window.innerWidth;
    if (width <= 400) return academiaImages[400];
    if (width <= 500) return academiaImages[500];
    if (width <= 600) return academiaImages[600];
    if (width <= 700) return academiaImages[700];
    if (width <= 800) return academiaImages[800];
    if (width <= 900) return academiaImages[900];
    if (width <= 1000) return academiaImages[1000];
    if (width <= 1100) return academiaImages[1100];
    if (width <= 1200) return academiaImages[1200];
    return academiaImages.desktop;
  }

  function updateAcademiaImage() {
    academiaImg.src = getAcademiaImage();
  }

  updateAcademiaImage();
  window.addEventListener("resize", updateAcademiaImage);
});


// =========================
// SECCIÓN ACADEMIA FÚTBOL – Imagen Adaptativa
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const academiaImgFutbol = document.querySelector(".academia-img-futbol");

  const futbolImages = {
    400: "../../img/academia/futbol400.png",
    500: "../../img/academia/futbol500.png",
    600: "../../img/academia/futbol600.png",
    700: "../../img/academia/futbol700.png",
    800: "../../img/academia/futbol800.png",
    900: "../../img/academia/futbol900.png",
    1000: "../../img/academia/futbol1000.png",
    1100: "../../img/academia/futbol1100.png",
    1200: "../../img/academia/futbol1200.png",
    desktop: "../../img/academia/futbol2000.png"
  };

  function getFutbolImage() {
    const width = window.innerWidth;
    if (width <= 400) return futbolImages[400];
    if (width <= 500) return futbolImages[500];
    if (width <= 600) return futbolImages[600];
    if (width <= 700) return futbolImages[700];
    if (width <= 800) return futbolImages[800];
    if (width <= 900) return futbolImages[900];
    if (width <= 1000) return futbolImages[1000];
    if (width <= 1100) return futbolImages[1100];
    if (width <= 1200) return futbolImages[1200];
    return futbolImages.desktop;
  }

  function updateFutbolImage() {
    academiaImgFutbol.src = getFutbolImage();
  }

  updateFutbolImage();
  window.addEventListener("resize", updateFutbolImage);
});

// =========================
//  SECCIÓN ACADEMIA VÓLEY – Imagen Adaptativa
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const academiaImgVoley = document.querySelector(".academia-img-voley");

  const voleyImages = {
    400: "../../img/academia/voley400.png",
    500: "../../img/academia/voley500.png",
    600: "../../img/academia/voley600.png",
    700: "../../img/academia/voley700.png",
    800: "../../img/academia/voley800.png",
    900: "../../img/academia/voley900.png",
    1000: "../../img/academia/voley1000.png",
    1100: "../../img/academia/voley1100.png",
    1200: "../../img/academia/voley1200.png",
    desktop: "../../img/academia/voley2000.png"
  };

  function getVoleyImage() {
    const width = window.innerWidth;
    if (width <= 400) return voleyImages[400];
    if (width <= 500) return voleyImages[500];
    if (width <= 600) return voleyImages[600];
    if (width <= 700) return voleyImages[700];
    if (width <= 800) return voleyImages[800];
    if (width <= 900) return voleyImages[900];
    if (width <= 1000) return voleyImages[1000];
    if (width <= 1100) return voleyImages[1100];
    if (width <= 1200) return voleyImages[1200];
    return voleyImages.desktop;
  }

  function updateVoleyImage() {
    academiaImgVoley.src = getVoleyImage();
  }

  updateVoleyImage();
  window.addEventListener("resize", updateVoleyImage);
});


// =========================
// SECCIÓN ACADEMIA DANZA – Imagen Adaptativa
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const academiaImgDanza = document.querySelector(".academia-img-danza");

  const danzaImages = {
    400: "../../img/academia/danza400.png",
    500: "../../img/academia/danza500.png",
    600: "../../img/academia/danza600.png",
    700: "../../img/academia/danza700.png",
    800: "../../img/academia/danza800.png",
    900: "../../img/academia/danza900.png",
    1000: "../../img/academia/danza1000.png",
    1100: "../../img/academia/danza1100.png",
    1200: "../../img/academia/danza1200.png",
    desktop: "../../img/academia/danza2000.png"
  };

  function getDanzaImage() {
    const width = window.innerWidth;
    if (width <= 400) return danzaImages[400];
    if (width <= 500) return danzaImages[500];
    if (width <= 600) return danzaImages[600];
    if (width <= 700) return danzaImages[700];
    if (width <= 800) return danzaImages[800];
    if (width <= 900) return danzaImages[900];
    if (width <= 1000) return danzaImages[1000];
    if (width <= 1100) return danzaImages[1100];
    if (width <= 1200) return danzaImages[1200];
    return danzaImages.desktop;
  }

  function updateDanzaImage() {
    academiaImgDanza.src = getDanzaImage();
  }

  updateDanzaImage();
  window.addEventListener("resize", updateDanzaImage);
});

// ======== Desplazamiento suave desde submenú Talleres ========
document.addEventListener("DOMContentLoaded", () => {
  const submenuLinks = document.querySelectorAll(".submenu-item");

  submenuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60, // ajusta según altura del header
          behavior: "smooth"
        });
      }
    });
  });
});
