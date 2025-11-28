// --- Estado del menú responsive ---
let menuVisible = false;

// --- Helpers para DOM ---
function $(sel) { return document.querySelector(sel); }
function $all(sel) { return Array.from(document.querySelectorAll(sel)); }

// --- Mostrar / ocultar menú (necesario para onclick del HTML) ---
function mostrarOcultarMenu() {
  const nav = $("#nav");
  if (!nav) return;
  if (menuVisible) {
    nav.classList.remove("responsive");
    menuVisible = false;
  } else {
    nav.classList.add("responsive");
    menuVisible = true;
  }
}

// --- Seleccionar opción del menú (cierra el menú en móvil) ---
function seleccionar() {
  const nav = $("#nav");
  if (!nav) return;
  nav.classList.remove("responsive");
  menuVisible = false;
}

// Exponer para que funcionen los onclick del HTML
window.mostrarOcultarMenu = mostrarOcultarMenu;
window.seleccionar = seleccionar;

// --- Animación de barras de habilidades ---
let skillsAnimadas = false;

function efectoHabilidades() {
  if (skillsAnimadas) return;

  const skills = $("#skills");
  if (!skills) return;

  const rect = skills.getBoundingClientRect();
  const alturaVentana = window.innerHeight || document.documentElement.clientHeight;

  // Cuando la parte superior de la sección entra lo suficiente en pantalla
  const visible = alturaVentana - rect.top >= 300;
  if (!visible) return;

  const barras = $all(".progreso");
  if (barras.length === 0) return;

  // Activar clases en orden. Si faltan, no revienta.
  const clases = [
    "javascript",  // 0  -> C/C++
    "htmlcss",     // 1  -> Python
    "photoshop",   // 2  -> Matlab
    "wordpress",   // 3  -> ROS
    "drupal",      // 4  -> JAVA
    "comunicacion",// 5  -> TeamWork
    "trabajo",     // 6  -> Comunication
    "creatividad", // 7  -> Dedication
    "dedicacion",  // 8  -> Creativity
    "proyect"      // 9  -> Proyect Management
  ];

  barras.forEach((barra, i) => {
    if (clases[i]) barra.classList.add(clases[i]);
  });

  skillsAnimadas = true;
}

// --- Scroll + load ---
function onScroll() {
  // Usa requestAnimationFrame para no saturar
  if (!onScroll.ticking) {
    window.requestAnimationFrame(() => {
      efectoHabilidades();
      onScroll.ticking = false;
    });
    onScroll.ticking = true;
  }
}
onScroll.ticking = false;

document.addEventListener("DOMContentLoaded", () => {
  // Cierra el menú al hacer clic en cualquier enlace del nav (por si no usas onclick)
  $all("#nav a").forEach(a => {
    a.addEventListener("click", seleccionar);
  });

  // Listener de scroll (pasivo para mejor rendimiento)
  window.addEventListener("scroll", onScroll, { passive: true });

  // Dispara una primera comprobación por si al cargar ya está visible
  efectoHabilidades();

  // Botón de envío del formulario (si existe)
  const sendBtn = document.getElementById("sendMessage");
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      alert("ATENCIÓN: el correo no ha sido enviado. Por favor, envíe un correo directo a: pablocabaleironoda@gmail.com");
    });
  }
});


