const enlacesRedesSociales = [
  {
    nombre: "TikTok",
    url: "https://www.tiktok.com/@inetec.s.a.s",
  },
  {
    nombre: "Instagram",
    url: "https://www.instagram.com/inetec.s.a.s/",
  },
  {
    nombre: "YouTube",
    url: "https://www.youtube.com/@inetecs.a.s",
  },
];

document.querySelectorAll("[data-redes-sociales]").forEach((contenedor) => {
  enlacesRedesSociales.forEach(({ nombre, url }) => {
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    enlace.textContent = nombre;
    contenedor.append(enlace);
  });
});
