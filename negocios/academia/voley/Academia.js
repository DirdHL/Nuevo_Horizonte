document.addEventListener("DOMContentLoaded", () => {
  console.log("academia.js listo ✅");
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("academia.js cargado ✅");

  const contacto = document.querySelector(".menu-item.contacto");
  const texto = contacto.querySelector(".menu-text");

  contacto.addEventListener("mouseenter", () => {
    texto.textContent = "963666205";
  });

  contacto.addEventListener("mouseleave", () => {
    texto.textContent = "Contacto";
  });
});