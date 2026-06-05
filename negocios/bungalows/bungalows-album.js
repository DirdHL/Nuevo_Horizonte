/* ==========================================================================
   JAVASCRIPT - ÁLBUM BUNGALOWS TOMAYQUICHUA (DINÁMICO)
   ========================================================================== */

// --- CONFIGURACIÓN DE IMÁGENES ---
// Puedes personalizar la información de cada imagen aquí.
// El sistema buscará automáticamente archivos con nombres 'img_01', 'img_02', etc.
// en la carpeta: '../../img/bungalows-de-tomayquichua/'
// 
// Extensiones soportadas automáticamente: .webp, .jpg, .png, .jpeg (en ese orden).
// Si el archivo no existe en la carpeta, el cuadro correspondiente NO se mostrará.
//
// Categorías disponibles para filtrar:
// - 'bungalows' (Bungalows)
// - 'pool' (Piscina)
// - 'gardens' (Exteriores y Juegos)
const PHOTO_CONFIG = {
  'img_01': { category: 'pool', title: 'Piscina y Solárium', desc: 'Gran piscina ideal para relajarse bajo el sol de Tomayquichua.' },
  'img_02': { category: 'bungalows', title: 'Bungalows de Campo', desc: 'Estructuras cómodas y privadas rodeadas de abundante naturaleza.' },
  'img_03': { category: 'bungalows', title: 'Dormitorio Principal', desc: 'Habitaciones cálidas y acogedoras equipadas para un descanso reparador.' },
  'img_04': { category: 'gardens', title: 'Cancha y Recreo', desc: 'Espacios deportivos y zona de parrillas para disfrutar en familia.' },
  'img_05': { category: 'bungalows', title: 'Cocina Equipada', desc: 'Cocina y comedor compartidos con todos los utensilios necesarios.' },
  'img_06': { category: 'bungalows', title: 'Baños Privados', desc: 'Servicios higiénicos limpios con ducha de agua caliente.' },
  'img_07': { category: 'gardens', title: 'Áreas Verdes y Sendas', desc: 'Amplios espacios naturales de esparcimiento y conexión con la naturaleza.' },
  'img_08': { category: 'gardens', title: 'Paseos en Cuatrimoto', desc: 'Diversión, velocidad y adrenalina recorriendo los caminos de Tomayquichua.' },
  'img_09': { category: 'gardens', title: 'Vista del Paisaje', desc: 'El increíble entorno andino que rodea a nuestra casa de campo.' },
};

// Cantidad máxima de imágenes consecutivas que el sistema intentará buscar (img_01 a img_120)
const MAX_PHOTOS_TO_SCAN = 120;
const PREFERRED_EXTENSIONS = ['.webp', '.jpg', '.png', '.jpeg'];

document.addEventListener('DOMContentLoaded', () => {
  // --- NAVEGACIÓN ACTIVA ---
  const navItems = document.querySelectorAll('.nav-menu .nav-item-wrapper');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-item');
    if (link && link.getAttribute('href') === 'bungalows-album.html') {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }
  });

  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  // --- GENERACIÓN DINÁMICA DE LA GALERÍA ---
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= MAX_PHOTOS_TO_SCAN; i++) {
    const numStr = String(i).padStart(2, '0');
    const filename = `img_${numStr}`;
    const config = PHOTO_CONFIG[filename] || {};
    
    const category = config.category || 'bungalows';
    const title = config.title || `Instalación ${numStr}`;
    const desc = config.desc || `Disfruta de nuestros hermosos y cómodos ambientes.`;

    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-category', category);
    galleryItem.setAttribute('data-title', title);
    galleryItem.setAttribute('data-desc', desc);

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'gallery-img-wrapper';

    const img = document.createElement('img');
    img.alt = title;
    img.loading = 'lazy';

    let extIndex = 0;
    const basePath = `../../img/bungalows-de-tomayquichua/${filename}`;

    img.onerror = () => {
      extIndex++;
      if (extIndex < PREFERRED_EXTENSIONS.length) {
        const nextSrc = `${basePath}${PREFERRED_EXTENSIONS[extIndex]}`;
        img.src = nextSrc;
        galleryItem.setAttribute('data-src', nextSrc);
      } else {
        galleryItem.remove();
        updateVisibleItems();
      }
    };

    img.onload = () => {
      galleryItem.classList.add('show');
      updateVisibleItems();
    };

    img.src = `${basePath}${PREFERRED_EXTENSIONS[extIndex]}`;
    galleryItem.setAttribute('data-src', img.src);

    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    overlay.innerHTML = `
      <span class="zoom-icon">🔍</span>
      <h3>${title}</h3>
      <p>Toca para ver en grande</p>
    `;

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(overlay);
    galleryItem.appendChild(imgWrapper);
    fragment.appendChild(galleryItem);
  }

  galleryGrid.appendChild(fragment);

  // --- FILTRO DE GALERÍA ---
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      const allGalleryItems = galleryGrid.querySelectorAll('.gallery-item');

      allGalleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
          setTimeout(() => {
            item.classList.add('show');
          }, 10);
        } else {
          item.classList.remove('show');
          item.classList.add('hide');
        }
      });
      updateVisibleItems();
    });
  });

  // --- LÓGICA DEL LIGHTBOX ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let visibleItems = [];
  let currentIndex = 0;

  function updateVisibleItems() {
    const allGalleryItems = galleryGrid.querySelectorAll('.gallery-item');
    visibleItems = Array.from(allGalleryItems).filter(item => !item.classList.contains('hide'));
  }

  function showLightbox(index) {
    if (index < 0 || index >= visibleItems.length) return;
    
    currentIndex = index;
    const currentItem = visibleItems[currentIndex];
    
    const src = currentItem.getAttribute('data-src');
    const title = currentItem.getAttribute('data-title');
    const desc = currentItem.getAttribute('data-desc');

    lightboxImg.src = src;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightboxCounter.textContent = `${currentIndex + 1} de ${visibleItems.length}`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= visibleItems.length) {
      nextIndex = 0;
    }
    showLightbox(nextIndex);
  }

  function prevImage() {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = visibleItems.length - 1;
    }
    showLightbox(prevIndex);
  }

  galleryGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item) {
      updateVisibleItems();
      const index = visibleItems.indexOf(item);
      showLightbox(index);
    }
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  });

  setTimeout(updateVisibleItems, 100);
});
