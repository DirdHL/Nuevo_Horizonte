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



const fechaObjetivo = new Date("2026-07-27T15:00:00").getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
        document.getElementById("tiempo").innerHTML = "00 : 00 : 00 : 00";
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);
    const formato = (num) => num.toString().padStart(2, "0");

document.getElementById("tiempo").innerHTML = `
    <span>${dias}</span>
    <span>${formato(horas)}</span>
    <span>${formato(minutos)}</span>
    <span>${formato(segundos)}</span>
`;
}

setInterval(actualizarContador, 1000);
actualizarContador();
