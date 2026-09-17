const botonMiembros = document.querySelector(".btn-miembros");
const contenidoMiembros = document.getElementById("contenido-miembros");

function alternarContenido(boton, contenido) {
  const estaAbierto = boton.getAttribute("aria-expanded") === "true";
  const movimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  boton.setAttribute("aria-expanded", String(!estaAbierto));

  if (!estaAbierto) {
    contenido.hidden = false;
    contenido.style.maxHeight = "0px";

    if (movimientoReducido) {
      contenido.classList.add("esta-abierto");
      contenido.style.maxHeight = "none";
      return;
    }

    requestAnimationFrame(() => {
      contenido.classList.add("esta-abierto");
      contenido.style.maxHeight = `${contenido.scrollHeight}px`;
    });
    return;
  }

  if (movimientoReducido) {
    contenido.classList.remove("esta-abierto");
    contenido.hidden = true;
    contenido.style.maxHeight = "";
    return;
  }

  contenido.style.maxHeight = `${contenido.scrollHeight}px`;
  contenido.offsetHeight;
  contenido.classList.remove("esta-abierto");

  const finalizarCierre = (evento) => {
    if (evento.propertyName !== "max-height") {
      return;
    }

    contenido.removeEventListener("transitionend", finalizarCierre);
    if (contenido.classList.contains("esta-abierto")) {
      contenido.style.maxHeight = "none";
    } else {
      contenido.hidden = true;
      contenido.style.maxHeight = "";
    }
  };

  contenido.addEventListener("transitionend", finalizarCierre);
  requestAnimationFrame(() => {
    contenido.style.maxHeight = "0px";
  });
}

if (botonMiembros && contenidoMiembros) {
  botonMiembros.addEventListener("click", () => {
    alternarContenido(botonMiembros, contenidoMiembros);
  });

  const botonesGrupo = contenidoMiembros.querySelectorAll(".btn-grupo");

  botonesGrupo.forEach((botonGrupo) => {
    botonGrupo.addEventListener("click", () => {
      const contenidoGrupo = document.getElementById(
        botonGrupo.getAttribute("aria-controls"),
      );

      if (contenidoGrupo) {
        alternarContenido(botonGrupo, contenidoGrupo);
      }
    });
  });
}
