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

// ======= Hamburguesa mejorada (toggle visible/oculto) =======
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const sideMenu = document.getElementById("sideMenu");
  const closeBtn = document.getElementById("closeMenu");
  const overlay = document.getElementById("overlay");

  function openMenu() {
    hamburger.classList.add("active"); // oculta la hamburguesa
    sideMenu.classList.add("active");
    overlay.classList.add("active");
  }

  function closeMenu() {
    hamburger.classList.remove("active"); // vuelve a mostrar la hamburguesa
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  }

  hamburger.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});

