const botonMenu = document.querySelector(".menu-toggle");
const navegacion = document.querySelector(".nav-derecho");
const desplegables = document.querySelectorAll(".dropdown");

if (botonMenu && navegacion) {
  botonMenu.addEventListener("click", () => {
    const estaAbierto = navegacion.classList.toggle("esta-abierto");
    botonMenu.setAttribute("aria-expanded", String(estaAbierto));
  });
}

desplegables.forEach((desplegable) => {
  const boton = desplegable.querySelector(".dropbtn");

  if (!boton) {
    return;
  }

  boton.addEventListener("click", () => {
    const estaAbierto = desplegable.classList.toggle("esta-abierto");
    boton.setAttribute("aria-expanded", String(estaAbierto));
  });
});

document.querySelectorAll(".menu a").forEach((enlace) => {
  enlace.addEventListener("click", () => {
    if (!navegacion || !botonMenu) {
      return;
    }

    navegacion.classList.remove("esta-abierto");
    botonMenu.setAttribute("aria-expanded", "false");
  });
});
