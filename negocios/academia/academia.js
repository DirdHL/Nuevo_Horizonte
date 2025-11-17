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
    "../../img/academia/movil400-inicio.webp",
    "../../img/academia/movil400-natacion.webp",
    "../../img/academia/movil400-futbol.webp",
    "../../img/academia/movil400-voley.webp",
    "../../img/academia/movil400-danza.webp"
  ],
  500: [
    "../../img/academia/movil500-inicio.webp",
    "../../img/academia/movil500-natacion.webp",
    "../../img/academia/movil500-futbol.webp",
    "../../img/academia/movil500-voley.webp",
    "../../img/academia/movil500-danza.webp"
  ],
  600: [
    "../../img/academia/movil600-inicio.webp",
    "../../img/academia/movil600-natacion.webp",
    "../../img/academia/movil600-futbol.webp",
    "../../img/academia/movil600-voley.webp",
    "../../img/academia/movil600-danza.webp"
  ],
  700: [
    "../../img/academia/movil700-inicio.webp",
    "../../img/academia/movil700-natacion.webp",
    "../../img/academia/movil700-futbol.webp",
    "../../img/academia/movil700-voley.webp",
    "../../img/academia/movil700-danza.webp"
  ],
  800: [
    "../../img/academia/movil800-inicio.webp",
    "../../img/academia/movil800-natacion.webp",
    "../../img/academia/movil800-futbol.webp",
    "../../img/academia/movil800-voley.webp",
    "../../img/academia/movil800-danza.webp"
  ],
  900: [
    "../../img/academia/movil900-inicio.webp",
    "../../img/academia/movil900-natacion.webp",
    "../../img/academia/movil900-futbol.webp",
    "../../img/academia/movil900-voley.webp",
    "../../img/academia/movil900-danza.webp"
  ],
  1000: [
    "../../img/academia/movil1000-inicio.webp",
    "../../img/academia/movil1000-natacion.webp",
    "../../img/academia/movil1000-futbol.webp",
    "../../img/academia/movil1000-voley.webp",
    "../../img/academia/movil1000-danza.webp"
  ],
  1100: [
    "../../img/academia/movil1100-inicio.webp",
    "../../img/academia/movil1100-natacion.webp",
    "../../img/academia/movil1100-futbol.webp",
    "../../img/academia/movil1100-voley.webp",
    "../../img/academia/movil1100-danza.webp"
  ],
  1200: [
    "../../img/academia/movil1200-inicio.webp",
    "../../img/academia/movil1200-natacion.webp",
    "../../img/academia/movil1200-futbol.webp",
    "../../img/academia/movil1200-voley.webp",
    "../../img/academia/movil1200-danza.webp"
  ],
  desktop: [
    "../../img/academia/academia-carrusel-inicio.webp",
    "../../img/academia/carrusel-natacion.webp",
    "../../img/academia/carrusel-futbol.webp",
    "../../img/academia/carrusel-voley.webp",
    "../../img/academia/carrusel-danza.webp"
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
    interval = setInterval(nextSlide, 3000);
  }
  function stopAutoSlide() {
    clearInterval(interval);
  }

  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

// =========================
//  SWIPE EN CELULAR
// =========================
let touchStartX = 0;
let touchEndX = 0;
const MIN_SWIPE = 50; // distancia mínima para considerar un swipe

// Solo activar en pantallas pequeñas
if (window.innerWidth <= 900) {

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  container.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", () => {
    const swipeDist = touchEndX - touchStartX;

    if (Math.abs(swipeDist) > MIN_SWIPE) {
      if (swipeDist < 0) {
        nextSlide(); // hacia la izquierda → siguiente
      } else {
        prevSlide(); // hacia la derecha → anterior
      }
    }

    touchStartX = 0;
    touchEndX = 0;
  });
}

  showSlide(0);
  startAutoSlide();
});


// =========================
//  CARRUSELES DE SEDES
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const sedes = document.querySelectorAll(".sede");

  sedes.forEach((sede) => {
    const images = sede.querySelectorAll(".sede-carousel-container img");
    const prev = sede.querySelector(".sede-prev");
    const next = sede.querySelector(".sede-next");
    let index = 0;

    function showImage(i) {
      images.forEach((img, idx) => img.classList.toggle("active", idx === i));
    }

    prev.addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length;
      showImage(index);
    });

    next.addEventListener("click", () => {
      index = (index + 1) % images.length;
      showImage(index);
    });
  });
});


// =========================
// FILTRO DE GALERÍA (mantiene altura reducida tras filtrar)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const filtros = document.querySelectorAll(".galeria-filtros button");
  const items = Array.from(document.querySelectorAll(".galeria-item"));
  const grid = document.querySelector(".galeria-grid");
  const wrapper = document.querySelector(".galeria-grid-wrapper");
  const ANIM_DUR = 600; 

  function getVisibles(filter) {
    return (filter === "todo") ? items.slice() : items.filter(i => i.classList.contains(filter));
  }

  function applyFilter(filter) {
    const startHeight = wrapper.offsetHeight;
    const visibles = getVisibles(filter);
    const ocultos = items.filter(i => !visibles.includes(i));

    items.forEach(it => it.classList.add("oculto"));

    visibles.forEach(v => grid.appendChild(v));
    ocultos.forEach(h => grid.appendChild(h));
    void grid.offsetWidth; 

  

    ocultos.forEach(h => {
      h.__oldDisplay = h.style.display;
      h.style.display = "none";
    });
    requestAnimationFrame(() => {
      const endHeight = grid.scrollHeight;

      ocultos.forEach(h => {
        h.style.display = h.__oldDisplay || "";
        delete h.__oldDisplay;
      });
      
      wrapper.style.height = startHeight + "px";
      void wrapper.offsetWidth;
      wrapper.classList.add("animando");

      requestAnimationFrame(() => {
        wrapper.style.height = endHeight + "px";
      });

      setTimeout(() => {
        wrapper.classList.remove("animando");
        if (filter === "todo") {
          wrapper.style.height = "auto";
        } else {
          wrapper.style.height = endHeight + "px"; // se queda ahí
        }
      }, ANIM_DUR);

      setTimeout(() => {
        visibles.forEach(v => v.classList.remove("oculto"));
      }, 40);
    });
  }

  filtros.forEach(btn => {
    btn.addEventListener("click", () => {
      filtros.forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
      const filtro = btn.getAttribute("data-filter");
      applyFilter(filtro);
    });
  });

if (window.innerWidth <= 768) {
  setTimeout(() => applyFilter("natacion"), 100);
} else {
  setTimeout(() => applyFilter("todo"), 100);
}
});

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});


