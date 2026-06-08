/**
 * Recreo Campestre — Interactividad & Funcionalidades
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENTOS DEL DOM ---
  const header = document.getElementById('mainHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contactoForm');

  // --- 1. COMPORTAMIENTO DEL HEADER AL HACER SCROLL ---
  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  // Ejecutar al inicio y en cada evento de scroll
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll);

  // --- 2. MENÚ MÓVIL (HAMBURGUESA) ---
  const toggleMobileMenu = () => {
    hamburgerBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
    // Prevenir el scroll en el cuerpo cuando el menú está abierto
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    hamburgerBtn.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', toggleMobileMenu);

  // Cerrar menú al hacer clic en un enlace de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Cerrar menú al hacer clic fuera de él
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !hamburgerBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // --- 3. SCROLL SPY (INDICADOR DE SECCIÓN ACTIVA EN EL MENÚ) ---
  const scrollSpy = () => {
    const scrollPosition = window.scrollY + 200; // Offset para mejor activación visual

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);

  // --- 4. FORMULARIO DE CONTACTO A WHATSAPP ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Obtener datos del formulario
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const eventDate = document.getElementById('eventDate').value;
      const message = document.getElementById('message').value.trim();

      // Formatear la fecha para que se vea más legible (Ej. 08/06/2026)
      let formattedDate = eventDate;
      if (eventDate) {
        const parts = eventDate.split('-');
        if (parts.length === 3) {
          formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
      }

      // Número de WhatsApp destino (reutilizando el número provisto)
      const targetPhoneNumber = "51983406127";

      // Construir mensaje
      const whatsappText = `¡Hola! Me gustaría cotizar/reservar un evento en el Recreo Campestre:\n\n` +
        `*Nombre:* ${name}\n` +
        `*Teléfono:* ${phone}\n` +
        `*Fecha del Evento:* ${formattedDate}\n` +
        `*Detalles:* ${message}`;

      // Codificar el texto para la URL
      const encodedText = encodeURIComponent(whatsappText);

      // Crear URL de WhatsApp
      const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodedText}`;

      // Enviar a WhatsApp
      window.open(whatsappUrl, '_blank');
    });
  }
});
