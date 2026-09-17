const root = document.documentElement;
const barra = document.querySelector(".barra");
const estado = document.querySelector("#estado-carga");
let progreso = 0;

const intervalo = window.setInterval(() => {
  progreso = Math.min(progreso + Math.floor(Math.random() * 8) + 3, 100);
  root.style.setProperty("--progreso", `${progreso}%`);
  barra.setAttribute("aria-valuenow", progreso);
  estado.textContent = `Cargando... ${progreso}%`;

  if (progreso === 100) {
    window.clearInterval(intervalo);
    estado.textContent = "Listo";
    window.setTimeout(() => {
      window.location.href = "../html/index.html";
    }, 650);
  }
}, 170);