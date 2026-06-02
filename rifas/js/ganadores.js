/* =======================================================
   CARRUSEL DE GANADORES - LÓGICA INTERACTIVA
======================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const cards = document.querySelectorAll(".ganador-card");
    const dots = document.querySelectorAll(".carousel-dots .dot");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const viewport = document.querySelector(".carousel-viewport");

    if (!track || !cards.length || !viewport) return;

    // Comenzamos con la tarjeta central (Carlos M., index 2) activa
    let currentIndex = 2;

    /**
     * Calcula la traslación para centrar la tarjeta activa y actualiza las clases
     */
    function updateSlider() {
        const viewportWidth = viewport.offsetWidth;
        const cardWidth = cards[0].offsetWidth;

        // Leemos el gap del CSS dinámicamente
        const computedStyle = window.getComputedStyle(track);
        const gap = parseFloat(computedStyle.gap) || 30;

        // Fórmula matemática para centrar la tarjeta 'currentIndex' en el viewport:
        // offset = (AnchoViewport / 2 - AnchoTarjeta / 2) - Index * (AnchoTarjeta + Gap)
        const centerOffset = (viewportWidth / 2) - (cardWidth / 2);
        const translateValue = centerOffset - (currentIndex * (cardWidth + gap));

        // Aplicamos el transform al track
        track.style.transform = `translateX(${translateValue}px)`;

        // Actualizamos las clases activas en las tarjetas
        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add("card-active");
            } else {
                card.classList.remove("card-active");
            }
        });

        // Actualizamos los indicadores (dots)
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    // =======================================================
    // NAVEGACIÓN POR CLICS
    // =======================================================

    // Flecha Anterior
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
            updateSlider();
        });
    }

    // Flecha Siguiente
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });
    }

    // Clic en los Indicadores (Dots)
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Clic directo en las tarjetas para centrarlas
    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            if (currentIndex !== index) {
                currentIndex = index;
                updateSlider();
            }
        });
    });

    // =======================================================
    // SOPORTE TÁCTIL (SWIPE GESTURES)
    // =======================================================
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    viewport.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    viewport.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    }, { passive: true });

    viewport.addEventListener("touchend", () => {
        if (!isDragging) return;
        isDragging = false;
        const diffX = startX - currentX;

        // Umbral de deslizamiento de 50 píxeles
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe hacia la izquierda -> Siguiente tarjeta
                currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
            } else {
                // Swipe hacia la derecha -> Tarjeta anterior
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
            }
            updateSlider();
        }
    });

    // =======================================================
    // AJUSTE DINÁMICO EN CAMBIO DE RESOLUCIÓN
    // =======================================================
    window.addEventListener("resize", updateSlider);

    // Inicialización del slider al cargar
    setTimeout(updateSlider, 150); // Pequeño delay para asegurar que el DOM y el CSS se hayan calculado
});
