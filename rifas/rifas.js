// FECHA OBJETIVO PARA LA RIFA DEL 27 DE JULIO
const fechaObjetivo = new Date("2026-07-27T15:00:00").getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

// SCRIPT PARA EL RELOJ   
    if (diferencia <= 0) {
        document.getElementById("tiempo").innerHTML = "00 : 00 : 00 : 00";
        return;
    }

//Aqui insertamos la formula matematica para que tenga un punto de inicio
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);
    const formato = (num) => num.toString().padStart(2, "0");

document.getElementById("tiempo").innerHTML = 
    `<span>${dias}</span>
    <span>${formato(horas)}</span>
    <span>${formato(minutos)}</span>
    <span>${formato(segundos)}</span>`;
}

//Aqui permite actulizar cada 1000 tick(1 segundo)
setInterval(actualizarContador, 1000);
actualizarContador();

function comprarTicket() {
    const numero = "51983406127";
    const mensaje = "¡Hola! deseo información de la rifa";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(url, "_blank");
}