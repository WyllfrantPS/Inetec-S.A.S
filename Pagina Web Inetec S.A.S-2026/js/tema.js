const temas = ['dark', 'light', 'azul-nocturno', 'azul-hielo'];
const nombresTemas = {
    dark: 'oscuro original',
    light: 'claro original',
    'azul-nocturno': 'azul nocturno',
    'azul-hielo': 'azul hielo'
};
const temaGuardado = localStorage.getItem('tema-inetec');
const temaInicial = temas.includes(temaGuardado) ? temaGuardado : 'dark';
document.documentElement.setAttribute('data-theme', temaInicial);

const botonTema = document.getElementById('theme-toggle');
const iconoTema = document.getElementById('theme-icon');

function actualizarIconoTema() {
    const temaActual = document.documentElement.getAttribute('data-theme');
    const indiceActual = temas.indexOf(temaActual);
    const siguienteTema = temas[(indiceActual + 1) % temas.length];
    iconoTema.textContent = temaActual === 'dark' || temaActual === 'azul-nocturno' ? '☀️' : '🌙';
    botonTema.setAttribute('aria-label', `Cambiar al tema ${nombresTemas[siguienteTema]}`);
    botonTema.setAttribute('title', `Siguiente tema: ${nombresTemas[siguienteTema]}`);
}

if (botonTema && iconoTema) {
    actualizarIconoTema();

    botonTema.addEventListener('click', () => {
        const temaActual = document.documentElement.getAttribute('data-theme');
        const indiceActual = temas.indexOf(temaActual);
        const temaNuevo = temas[(indiceActual + 1) % temas.length];

        document.documentElement.setAttribute('data-theme', temaNuevo);
        localStorage.setItem('tema-inetec', temaNuevo);
        actualizarIconoTema();
    });
}
