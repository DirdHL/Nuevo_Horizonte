// Aquí puedes agregar cualquier funcionalidad que necesites
console.log("Página de Importaciones cargada correctamente ✔️");

// Lista de productos con imágenes
const productos = [
    {
        nombre: "GRASS SINTÉTICO",
        img: "../../img/importaciones/grass-img1.png"
    },
    {
        nombre: "LENTES DE NATACIÓN",
        img: "../../img/importaciones/lentes-de-natacion-img1.png"
    },
    {
        nombre: "REFLECTORES ELÉCTRICOS",
        img: "../../img/importaciones/reflectores-electricos-img1.png"
    },
    {
        nombre: "REFLECTORES SOLARES",
        img: "../../img/importaciones/reflectores-solares-img1.png"
    },
    {
        nombre: "GLP",
        img: "../../img/importaciones/glp-img1.png"
    }
];

// BUSCADOR POR LETRAS
const inputBusqueda = document.getElementById("busqueda");
const listaResultados = document.getElementById("resultado-busqueda");

inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.toLowerCase();
    listaResultados.innerHTML = "";

    if (texto === "") {
        listaResultados.style.display = "none";
        return;
    }

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    if (filtrados.length === 0) {
        listaResultados.style.display = "none";
        return;
    }

    filtrados.forEach(item => {
        const li = document.createElement("li");

        li.innerHTML = `
            <img src="${item.img}" class="img-mini" alt="">
            <span>${item.nombre}</span>
        `;

        li.addEventListener("click", () => {
            inputBusqueda.value = item.nombre;
            listaResultados.style.display = "none";
        });

        listaResultados.appendChild(li);
    });

    listaResultados.style.display = "block";
});
