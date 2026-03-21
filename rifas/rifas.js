// FECHA OBJETIVO (27 JULIO 2026 - 15:00)
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
        `${dias} : ${formato(horas)} : ${formato(minutos)} : ${formato(segundos)}`;
}

setInterval(actualizarContador, 1000);

actualizarContador();