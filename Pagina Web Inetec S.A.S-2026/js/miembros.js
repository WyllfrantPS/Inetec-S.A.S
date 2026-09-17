const botonMiembros = document.querySelector(".btn-miembros");
const contenidoMiembros = document.getElementById("contenido-miembros");

if (botonMiembros && contenidoMiembros) {
  botonMiembros.addEventListener("click", () => {
    const estaAbierto = botonMiembros.getAttribute("aria-expanded") === "true";

    botonMiembros.setAttribute("aria-expanded", String(!estaAbierto));
    contenidoMiembros.hidden = estaAbierto;
  });

  const botonesGrupo = contenidoMiembros.querySelectorAll(".btn-grupo");

  botonesGrupo.forEach((botonGrupo) => {
    botonGrupo.addEventListener("click", () => {
      const contenidoGrupo = document.getElementById(
        botonGrupo.getAttribute("aria-controls"),
      );
      const estaAbierto = botonGrupo.getAttribute("aria-expanded") === "true";

      botonGrupo.setAttribute("aria-expanded", String(!estaAbierto));
      contenidoGrupo.hidden = estaAbierto;
    });
  });
}
