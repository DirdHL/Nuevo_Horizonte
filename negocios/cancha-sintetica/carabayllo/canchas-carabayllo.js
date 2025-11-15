// Al hacer click en el logo recarga la misma página
document.getElementById("logo-link").addEventListener("click", function(e) {
    e.preventDefault(); // Evita comportamiento extraño
    window.location.reload(); // Recarga la página
});
