const logoJuego = document.getElementById("logo-inicio-juego");
const dialogoJuego = document.getElementById("dino-dialog");
const canvasJuego = document.getElementById("dino-canvas");
const contextoJuego = canvasJuego?.getContext("2d");
const salidaPuntos = document.getElementById("dino-score");
const salidaRecord = document.getElementById("dino-best");
const estadoJuego = document.getElementById("dino-status");
const botonSaltar = document.getElementById("dino-jump");
const botonReiniciar = document.getElementById("dino-restart");
const botonCerrar = document.getElementById("dino-close");

if (
  logoJuego &&
  dialogoJuego &&
  canvasJuego &&
  contextoJuego &&
  salidaPuntos &&
  salidaRecord &&
  estadoJuego &&
  botonSaltar &&
  botonReiniciar &&
  botonCerrar
) {
  const anchoJuego = canvasJuego.width;
  const altoJuego = canvasJuego.height;
  const suelo = 198;
  const dinosaurio = { x: 76, y: suelo - 46, ancho: 38, alto: 46, velocidadY: 0 };
  let obstaculos = [];
  let nubes = [
    { x: 155, y: 52, ancho: 48 },
    { x: 445, y: 84, ancho: 62 },
    { x: 680, y: 42, ancho: 40 },
  ];
  let puntos = 0;
  let record = leerRecord();
  let velocidad = 5.5;
  let esperaObstaculo = 65;
  let distanciaSuelo = 0;
  let marco = 0;
  let ultimoTiempo = 0;
  let animacion = 0;
  let enMarcha = false;
  let clicsLogo = 0;
  let temporizadorClic;

  salidaRecord.value = formatearPuntos(record);
  salidaRecord.textContent = formatearPuntos(record);

  function leerRecord() {
    try {
      return Number(localStorage.getItem("inetec-dino-record")) || 0;
    } catch {
      return 0;
    }
  }

  function guardarRecord() {
    try {
      localStorage.setItem("inetec-dino-record", String(record));
    } catch {
      return;
    }
  }

  function formatearPuntos(valor) {
    return String(valor).padStart(5, "0");
  }

  function abrirJuego() {
    if (dialogoJuego.open) {
      return;
    }

    reiniciarJuego();
    dialogoJuego.showModal();
    botonCerrar.focus();
    animacion = requestAnimationFrame(actualizarJuego);
  }

  function reiniciarJuego() {
    cancelAnimationFrame(animacion);
    puntos = 0;
    velocidad = 5.5;
    esperaObstaculo = 65;
    distanciaSuelo = 0;
    obstaculos = [];
    dinosaurio.y = suelo - dinosaurio.alto;
    dinosaurio.velocidadY = 0;
    marco = 0;
    ultimoTiempo = 0;
    enMarcha = true;
    salidaPuntos.value = formatearPuntos(puntos);
    salidaPuntos.textContent = formatearPuntos(puntos);
    estadoJuego.textContent = "Salta los cactus para sumar puntos.";
    dibujarEscena();

    if (dialogoJuego.open) {
      animacion = requestAnimationFrame(actualizarJuego);
    }
  }

  function saltar() {
    if (enMarcha && dinosaurio.y >= suelo - dinosaurio.alto) {
      dinosaurio.velocidadY = -12.5;
    }
  }

  function actualizarJuego(tiempo) {
    if (!dialogoJuego.open) {
      return;
    }

    const paso = ultimoTiempo ? Math.min((tiempo - ultimoTiempo) / 16.67, 2) : 1;
    ultimoTiempo = tiempo;
    marco += paso;

    if (enMarcha) {
      avanzarJuego(paso);
    }

    dibujarEscena();
    animacion = requestAnimationFrame(actualizarJuego);
  }

  function avanzarJuego(paso) {
    dinosaurio.velocidadY += 0.68 * paso;
    dinosaurio.y += dinosaurio.velocidadY * paso;

    if (dinosaurio.y > suelo - dinosaurio.alto) {
      dinosaurio.y = suelo - dinosaurio.alto;
      dinosaurio.velocidadY = 0;
    }

    velocidad = Math.min(5.5 + puntos / 100, 12);
    distanciaSuelo = (distanciaSuelo + velocidad * paso) % 34;
    puntos += paso * velocidad * 0.09;
    salidaPuntos.value = formatearPuntos(Math.floor(puntos));
    salidaPuntos.textContent = formatearPuntos(Math.floor(puntos));

    esperaObstaculo -= paso;
    if (esperaObstaculo <= 0) {
      const tamanos = [
        { ancho: 14, alto: 22 },
        { ancho: 19, alto: 34 },
        { ancho: 26, alto: 51 },
      ];
      const cantidad = 2 + Math.floor(Math.random() * 3);
      const primerTamano = Math.floor(Math.random() * tamanos.length);
      const separacion = Math.max(25, 37 - velocidad);

      for (let indice = 0; indice < cantidad; indice += 1) {
        const tamano = tamanos[(primerTamano + indice) % tamanos.length];
        obstaculos.push({
          x: anchoJuego + 12 + indice * separacion,
          y: suelo - tamano.alto,
          ancho: tamano.ancho,
          alto: tamano.alto,
        });
      }

      esperaObstaculo = (430 + Math.random() * 180) / velocidad;
    }

    obstaculos = obstaculos.filter((obstaculo) => {
      obstaculo.x -= velocidad * paso;
      return obstaculo.x + obstaculo.ancho > -5;
    });

    nubes = nubes.map((nube) => {
      const nuevaX = nube.x - velocidad * 0.13 * paso;
      return {
        ...nube,
        x: nuevaX < -nube.ancho ? anchoJuego + 20 : nuevaX,
      };
    });

    if (obstaculos.some(colisionaConDinosaurio)) {
      terminarJuego();
    }
  }

  function colisionaConDinosaurio(obstaculo) {
    const izquierda = dinosaurio.x + 5;
    const derecha = dinosaurio.x + dinosaurio.ancho - 3;
    const arriba = dinosaurio.y + 7;
    const abajo = dinosaurio.y + dinosaurio.alto - 3;

    return (
      derecha > obstaculo.x + 3 &&
      izquierda < obstaculo.x + obstaculo.ancho - 3 &&
      abajo > obstaculo.y + 3 &&
      arriba < suelo
    );
  }

  function terminarJuego() {
    enMarcha = false;
    const puntuacionFinal = Math.floor(puntos);

    if (puntuacionFinal > record) {
      record = puntuacionFinal;
      guardarRecord();
      salidaRecord.value = formatearPuntos(record);
      salidaRecord.textContent = formatearPuntos(record);
      estadoJuego.textContent = `¡Nuevo récord: ${record}! Pulsa Reiniciar para intentarlo otra vez.`;
    } else {
      estadoJuego.textContent = `Fin del juego. Lograste ${puntuacionFinal} puntos. Pulsa Reiniciar para volver a jugar.`;
    }
  }

  function dibujarEscena() {
    contextoJuego.clearRect(0, 0, anchoJuego, altoJuego);
    contextoJuego.fillStyle = "#edf2e8";
    contextoJuego.fillRect(0, 0, anchoJuego, altoJuego);

    nubes.forEach(dibujarNube);

    contextoJuego.fillStyle = "#71876f";
    contextoJuego.fillRect(0, suelo, anchoJuego, 2);
    contextoJuego.fillStyle = "#9cac96";
    for (let x = -distanciaSuelo; x < anchoJuego; x += 34) {
      contextoJuego.fillRect(x, suelo + 9, 12, 2);
    }

    obstaculos.forEach(dibujarCactus);
    dibujarDinosaurio();

    if (!enMarcha) {
      contextoJuego.fillStyle = "rgba(237, 242, 232, 0.76)";
      contextoJuego.fillRect(0, 0, anchoJuego, altoJuego);
      contextoJuego.textAlign = "center";
      contextoJuego.fillStyle = "#26332a";
      contextoJuego.font = "700 30px monospace";
      contextoJuego.fillText("FIN DEL JUEGO", anchoJuego / 2, 113);
      contextoJuego.font = "16px monospace";
      contextoJuego.fillText("Pulsa Reiniciar para correr de nuevo", anchoJuego / 2, 145);
    }
  }

  function dibujarNube(nube) {
    const y = nube.y;
    const x = nube.x;
    contextoJuego.fillStyle = "#dce6d7";
    contextoJuego.fillRect(x + 9, y, nube.ancho - 18, 9);
    contextoJuego.fillRect(x, y + 8, nube.ancho, 10);
    contextoJuego.fillRect(x + 7, y + 17, nube.ancho - 13, 5);
  }

  function dibujarCactus(obstaculo) {
    const x = obstaculo.x;
    const y = obstaculo.y;
    const ancho = obstaculo.ancho;
    const alto = obstaculo.alto;
    contextoJuego.fillStyle = "#557b4d";
    contextoJuego.fillRect(x + ancho * 0.35, y, ancho * 0.35, alto);
    contextoJuego.fillRect(x, y + alto * 0.42, ancho * 0.42, 7);
    contextoJuego.fillRect(x, y + alto * 0.27, 6, alto * 0.2);
    contextoJuego.fillRect(x + ancho * 0.63, y + alto * 0.58, ancho * 0.37, 7);
    contextoJuego.fillRect(x + ancho * 0.63, y + alto * 0.42, 6, alto * 0.22);
  }

  function dibujarDinosaurio() {
    const x = dinosaurio.x;
    const y = dinosaurio.y;
    const pataArriba = enMarcha && dinosaurio.y === suelo - dinosaurio.alto;
    const pasoPata = Math.floor(marco / 6) % 2 === 0;
    contextoJuego.fillStyle = "#315c3e";
    contextoJuego.fillRect(x + 5, y + 18, 25, 21);
    contextoJuego.fillRect(x + 21, y + 6, 17, 17);
    contextoJuego.fillRect(x + 22, y + 19, 10, 18);
    contextoJuego.fillRect(x, y + 20, 9, 8);
    contextoJuego.fillRect(x + 27, y + 1, 5, 7);
    contextoJuego.fillStyle = "#edf2e8";
    contextoJuego.fillRect(x + 32, y + 10, 3, 3);
    contextoJuego.fillStyle = "#315c3e";

    if (!pataArriba || pasoPata) {
      contextoJuego.fillRect(x + 10, y + 37, 7, 9);
      contextoJuego.fillRect(x + 7, y + 44, 12, 3);
      contextoJuego.fillRect(x + 24, y + 37, 7, 5);
    } else {
      contextoJuego.fillRect(x + 10, y + 37, 7, 5);
      contextoJuego.fillRect(x + 8, y + 42, 12, 3);
      contextoJuego.fillRect(x + 24, y + 37, 7, 9);
      contextoJuego.fillRect(x + 23, y + 44, 12, 3);
    }
  }

  logoJuego.addEventListener("click", () => {
    clicsLogo += 1;
    clearTimeout(temporizadorClic);

    if (clicsLogo >= 3) {
      clicsLogo = 0;
      abrirJuego();
      return;
    }

    temporizadorClic = setTimeout(() => {
      clicsLogo = 0;
    }, 850);
  });

  logoJuego.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      abrirJuego();
    }
  });

  botonSaltar.addEventListener("click", saltar);
  botonReiniciar.addEventListener("click", reiniciarJuego);
  botonCerrar.addEventListener("click", () => dialogoJuego.close());
  canvasJuego.addEventListener("pointerdown", (evento) => {
    if (evento.pointerType !== "mouse") {
      saltar();
    }
  });

  dialogoJuego.addEventListener("keydown", (evento) => {
    if (
      enMarcha &&
      (evento.code === "Space" || evento.code === "ArrowUp") &&
      !evento.target.closest("button")
    ) {
      evento.preventDefault();
      saltar();
    }
  });

  dialogoJuego.addEventListener("close", () => {
    cancelAnimationFrame(animacion);
    animacion = 0;
  });
}