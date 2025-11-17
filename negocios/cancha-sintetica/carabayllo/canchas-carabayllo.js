
document.getElementById("logo-link").addEventListener("click", function(e) {
    e.preventDefault(); 
    window.location.reload();
});


function updateWhatsAppPosition() {
    const w = window.innerWidth;
    const btn = document.getElementById("wbtn");

    if (!btn) return;

    // 400px
    if (w <= 400) {
        btn.style.top = "70%";
        btn.style.left = "5%";
        return;
    }

    // 500px
    if (w <= 500) {
        btn.style.top = "68%";
        btn.style.left = "10%";
        return;
    }

    // 600px
    if (w <= 600) {
        btn.style.top = "65%";
        btn.style.left = "20%";
        return;
    }

    // 700px
    if (w <= 700) {
        btn.style.top = "62%";
        btn.style.left = "25%";
        return;
    }

    // 800px
    if (w <= 800) {
        btn.style.top = "60%";
        btn.style.left = "30%";
        return;
    }

    // 900px
    if (w <= 900) {
        btn.style.top = "58%";
        btn.style.left = "32%";
        return;
    }

    // 1000px
    if (w <= 1000) {
        btn.style.top = "56%";
        btn.style.left = "33%";
        return;
    }

    // 1100px
    if (w <= 1100) {
        btn.style.top = "54%";
        btn.style.left = "34%";
        return;
    }

    // 1200px
    if (w <= 1200) {
        btn.style.top = "52%";
        btn.style.left = "35%";
        return;
    }

    // PC
    btn.style.top = "75%";
    btn.style.left = "43%";
}

// Ejecutar al cargar
updateWhatsAppPosition();



// Ejecutar al cambiar tamaño de pantalla
window.addEventListener("resize", updateWhatsAppPosition);


