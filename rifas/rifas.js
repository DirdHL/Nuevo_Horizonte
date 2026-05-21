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

/* =======================================================
   EFECTOS PREMIUM HEADER
======================================================= */

// Seleccionamos todos los items del menú
const menuItems = document.querySelectorAll('.menu-item');

// Agregamos efecto elegante al hacer click
menuItems.forEach(item => {

    item.addEventListener('click', (e) => {

        // Animación rápida premium
        item.animate(
            [
                {
                    transform: 'scale(1)'
                },
                {
                    transform: 'scale(0.96)'
                },
                {
                    transform: 'scale(1)'
                }
            ],
            {
                duration: 220,
                easing: 'ease-out'
            }
        );

    });

});


/* =======================================================
   BOTON COMPRAR TICKET
======================================================= */

const btnTicket = document.querySelector('.btn-ticket');

btnTicket.addEventListener('click', () => {

    btnTicket.animate(
        [
            {
                transform: 'scale(1)'
            },
            {
                transform: 'scale(0.96)'
            },
            {
                transform: 'scale(1)'
            }
        ],
        {
            duration: 220,
            easing: 'ease-out'
        }
    );

});