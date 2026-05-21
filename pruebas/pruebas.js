/* =========================================
   HEADER - EFECTOS VISUALES
========================================= */

// Seleccionamos el título principal
const tituloPrincipal = document.querySelector('.titulo-principal');

// Efecto moderno al pasar el mouse
tituloPrincipal.addEventListener('mouseenter', () => {

    tituloPrincipal.style.transform = 'translateX(4px)';

});

// Restaurar posición original
tituloPrincipal.addEventListener('mouseleave', () => {

    tituloPrincipal.style.transform = 'translateX(0px)';

});