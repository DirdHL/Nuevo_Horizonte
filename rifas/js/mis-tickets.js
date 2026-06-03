/**
 * ============================================================================
 * CONSULTA DE TICKETS SEGURA - GRAN RIFA SPORT VICTORIA
 * Lógica con Encriptación SHA-256 del lado del cliente para proteger la privacidad.
 * ============================================================================
 */

// CONFIGURACIÓN DE SOPORTE (WHATSAPP)
const WHATSAPP_PHONE = "51900000000"; // Número de soporte de Sport Victoria / Nuevo Horizonte
const WHATSAPP_MESSAGE_BASE = "Hola, tengo una consulta sobre mis boletos de la rifa. Mi DNI es ";

/**
 * BASE DE DATOS DE TICKETS SIMULADA (Pre-computada con Hashes SHA-256 de los DNIs)
 * Para proteger la privacidad de los usuarios, no almacenamos DNIs en texto plano.
 * Las llaves son el hash SHA-256 del DNI (8 dígitos).
 * Los nombres están enmascarados (ej: Juan Pérez -> J*** P***) para evitar fugas de identidad.
 */
const TICKETS_DB = {
    // DNI: 12345678 -> sha256("12345678")
    "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f": {
        nombre: "J*** P***",
        boletos: ["0104", "0105", "0824"],
        fecha: "15/05/2026"
    },
    // DNI: 87654321 -> sha256("87654321")
    "e6c9b4e3e3b5e4128f73111b151121df0c108c909e7428f74a008bd4a0cfffcc": {
        nombre: "M*** G***",
        boletos: ["0412"],
        fecha: "22/05/2026"
    },
    // DNI: 98765432 -> sha256("98765432")
    "2ac9a6746aca543af8dff39894cfe8173afba214d17f21297b600d49b7fa3b7b": {
        nombre: "C*** R***",
        boletos: ["0023", "0024", "1509", "1510"],
        fecha: "01/06/2026"
    },
    // DNI: 11111111 -> sha256("11111111")
    "3ac3408320df1458e0a1ad675402636eb01b0460938ff5d023b185675549ad37": {
        nombre: "A*** M***",
        boletos: ["0777", "0778"],
        fecha: "28/05/2026"
    },
    // DNI: 22222222 -> sha256("22222222")
    "ca556858e99e90098df6c1032df37b42f63ad839446d3e852a420ee9b00fb8bf": {
        nombre: "L*** F***",
        boletos: ["1203", "1204"],
        fecha: "02/06/2026"
    }
};

/**
 * Función para generar el hash SHA-256 de una cadena usando la API Web Crypto nativa del navegador.
 */
async function sha256(str) {
    const msgBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Función auxiliar para enmascarar un nombre completo.
 * Útil para mantener la privacidad en el registro.
 */
function enmascararNombre(nombreCompleto) {
    const partes = nombreCompleto.trim().split(/\s+/);
    return partes.map(part => {
        if (part.length === 0) return "";
        return part[0].toUpperCase() + "*".repeat(Math.max(2, part.length - 1));
    }).join(" ");
}

// ELEMENTOS DEL DOM
const searchForm = document.getElementById("search-form");
const dniInput = document.getElementById("dni-input");
const btnSearch = document.getElementById("btn-search");
const btnSpinner = document.getElementById("btn-spinner");
const resultsContainer = document.getElementById("results-container");
const dniError = document.getElementById("dni-error");

// RESTRICCIÓN DE ENTRADA: Solo números en el campo DNI
dniInput.addEventListener("input", function() {
    // Elimina cualquier carácter que no sea un dígito del 0 al 9
    this.value = this.value.replace(/[^0-9]/g, "");
    
    // Si el usuario empieza a escribir, limpiamos el estado de error
    if (this.value.length > 0) {
        limpiarErrorDni();
    }
});

// Limpia el error visual del campo DNI
function limpiarErrorDni() {
    dniError.textContent = "";
    dniError.style.display = "none";
    dniInput.classList.remove("input-invalid");
}

// Muestra un mensaje de error en el campo DNI
function mostrarErrorDni(mensaje) {
    dniError.textContent = mensaje;
    dniError.style.display = "block";
    dniInput.classList.add("input-invalid");
    dniInput.focus();
}

// MANEJADOR DE ENVÍO DE FORMULARIO
searchForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const dni = dniInput.value.trim();
    
    // 1. Validar el DNI
    if (dni.length !== 8 || isNaN(dni)) {
        mostrarErrorDni("El DNI debe tener exactamente 8 dígitos numéricos.");
        return;
    }
    
    limpiarErrorDni();
    
    // 2. Estado de Carga (Simular consulta real para dar sensación de seguridad y robustez)
    setLoadingState(true);
    
    // Ocultar resultados previos
    resultsContainer.classList.remove("fade-in");
    
    // Tiempo de espera para la simulación (1.2 segundos para una UX premium fluida)
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    try {
        // 3. Generar el Hash del DNI ingresado
        const dniHash = await sha256(dni);
        
        // 4. Buscar en la base de datos
        const registro = TICKETS_DB[dniHash];
        
        // Limpiamos el contenedor y activamos la animación de entrada
        resultsContainer.innerHTML = "";
        resultsContainer.classList.add("fade-in");
        
        if (registro) {
            // Si todo está correcto, renderizamos los boletos digitales
            renderResultados(registro, dni);
        } else {
            // Si el DNI no está registrado en el mock
            renderErrorNoEncontrado(dni);
        }
    } catch (error) {
        console.error("Error al procesar la búsqueda:", error);
        renderErrorGeneral();
    } finally {
        setLoadingState(false);
    }
});

// Controla el estado visual de carga del botón
function setLoadingState(isLoading) {
    if (isLoading) {
        btnSearch.disabled = true;
        dniInput.disabled = true;
        btnSearch.querySelector(".btn-text").style.opacity = "0.5";
        btnSpinner.style.display = "inline-block";
    } else {
        btnSearch.disabled = false;
        dniInput.disabled = false;
        btnSearch.querySelector(".btn-text").style.opacity = "1";
        btnSpinner.style.display = "none";
    }
}

// RENDERIZADO DE BOLETOS ENCONTRADOS
function renderResultados(registro, dni) {
    const saludoNombre = registro.nombre;
    const totalTickets = registro.boletos.length;
    const ticketSufijo = totalTickets === 1 ? "boleto" : "boletos";
    
    let html = `
        <div class="results-header">
            <h3 class="results-title">¡Hola, <span class="results-name">${saludoNombre}</span>!</h3>
            <p class="tickets-subtitle" style="margin-top: 10px; font-size: 0.95rem;">
                Hemos encontrado <span class="highlight-gold" style="color: #ff9900; font-weight: 800;">${totalTickets}</span> ${ticketSufijo} asociado(s) a tu registro.
            </p>
        </div>
        <div class="tickets-grid">
    `;
    
    // Generar cada tarjeta de ticket
    registro.boletos.forEach(numBoleto => {
        html += `
            <div class="ticket-card">
                <div class="ticket-top">
                    <img src="../img/rifas/sport-victoria-logo.svg" alt="Sport Victoria" class="ticket-logo">
                    <span class="ticket-status">PAGADO</span>
                </div>
                <div class="ticket-body">
                    <span class="ticket-label">NÚMERO DE BOLETO</span>
                    <span class="ticket-number">${numBoleto}</span>
                </div>
                <div class="ticket-footer">
                    <div class="ticket-meta-row">
                        <span>Comprador:</span>
                        <span class="ticket-meta-val">${registro.nombre}</span>
                    </div>
                    <div class="ticket-meta-row">
                        <span>Fecha compra:</span>
                        <span class="ticket-meta-val">${registro.fecha}</span>
                    </div>
                    <div class="ticket-meta-row">
                        <span>Sorteo:</span>
                        <span class="ticket-meta-val" style="color: #ffaa00;">27 JUL 2026</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    
    resultsContainer.innerHTML = html;
}

// RENDERIZADO DE ERROR: DNI NO REGISTRADO
function renderErrorNoEncontrado(dni) {
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE_BASE + dni)}`;
    
    resultsContainer.innerHTML = `
        <div class="error-container">
            <div class="error-icon">⚠️</div>
            <h4 class="error-title">Boleto no registrado</h4>
            <p class="error-desc">
                No encontramos ningún boleto asociado al DNI ingresado. 
                Si acabas de realizar tu pago, recuerda que el registro manual puede demorar hasta <strong>24 horas</strong> en verse reflejado.
            </p>
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
                <svg class="whatsapp-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                <span>Reportar Pago por WhatsApp</span>
            </a>
        </div>
    `;
}



// RENDERIZADO DE ERROR: GENERAL / EXCEPCIÓN
function renderErrorGeneral() {
    resultsContainer.innerHTML = `
        <div class="error-container">
            <div class="error-icon">❌</div>
            <h4 class="error-title">Error en la consulta</h4>
            <p class="error-desc">
                Ocurrió un problema al procesar tu consulta de boletos. 
                Por favor, inténtalo nuevamente más tarde.
            </p>
        </div>
    `;
}

/**
 * ============================================================================
 * UTILIDADES DE ADMINISTRACIÓN (EXPUESAS EN CONSOLA)
 * ============================================================================
 */

// Expone una función en el objeto window para que el administrador pueda generar registros cifrados
window.generarRegistroDB = async function(dni, nombreCompleto, arrayBoletos, fechaCompra = null) {
    if (!dni || dni.length !== 8 || isNaN(dni)) {
        console.error("❌ El DNI debe ser una cadena de exactamente 8 dígitos.");
        return;
    }
    if (!nombreCompleto || nombreCompleto.trim().length === 0) {
        console.error("❌ Debes ingresar el nombre completo del comprador.");
        return;
    }
    if (!Array.isArray(arrayBoletos) || arrayBoletos.length === 0) {
        console.error("❌ Debes ingresar un array de números de boletos. Ejemplo: ['0120', '0121']");
        return;
    }
    
    try {
        const hash = await sha256(dni.trim());
        const maskedName = enmascararNombre(nombreCompleto);
        const fecha = fechaCompra || new Date().toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
        
        const output = {
            [hash]: {
                nombre: maskedName,
                boletos: arrayBoletos,
                fecha: fecha
            }
        };
        
        console.log(`%c🔑 Registro Generado Exitosamente para DNI: ${dni}`, "color: #00bfff; font-weight: bold; font-size: 1.1rem;");
        console.log(`%cHash SHA-256 (Llave):%c ${hash}`, "color: #ffffff; font-weight: bold;", "color: #ffaa00;");
        console.log(`%cObjeto a añadir en TICKETS_DB (dentro de js/mis-tickets.js):`, "color: #00ff66; font-weight: bold;");
        console.log(JSON.stringify(output, null, 4));
        
        return output;
    } catch (e) {
        console.error("Error al generar registro:", e);
    }
};

console.log(
    "%c🎟️ Buscador de Boletos Cargado Correctamente.\n" +
    "%cAdministrador:%c Si necesitas añadir nuevos registros, utiliza la consola F12 ejecutando:\n" +
    "await generarRegistroDB('DNI', 'Nombre Completo', ['Boleto1', 'Boleto2'])",
    "color: #00bfff; font-weight: bold; font-size: 1.1rem;",
    "color: #ff9900; font-weight: bold;",
    "color: #ffffff; font-style: italic;"
);
