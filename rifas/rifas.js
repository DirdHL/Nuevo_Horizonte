
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

document.getElementById("tiempo").innerHTML = 
    `<span>${dias}</span>
    <span>${formato(horas)}</span>
    <span>${formato(minutos)}</span>
    <span>${formato(segundos)}</span>`;
}

setInterval(actualizarContador, 1000);
actualizarContador();

function comprarTicket() {
    const numero = "51983406127";
    const mensaje = "¡Hola! deseo información de la rifa";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(url, "_blank");
}