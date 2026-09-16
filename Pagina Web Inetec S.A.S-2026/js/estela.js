const canvas = document.getElementById('canvas-estela');
const ctx = canvas.getContext('2d');

let mouse = { x: undefined, y: undefined };
let particulas = [];

function ajustarPantalla() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', ajustarPantalla);
ajustarPantalla();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    for(let i = 0; i < 2; i++) {
        particulas.push(new Circulito());
    }
});

class Circulito {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 5 + 2; 
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.015;
    }

    draw() {
        ctx.fillStyle = `rgba(0, 123, 255, ${this.opacity})`;
        ctx.strokeStyle = `rgba(0, 200, 255, ${this.opacity})`;
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
        ctx.fill();
        ctx.stroke();
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particulas.length; i++) {
        particulas[i].update();
        particulas[i].draw();
        
        if (particulas[i].opacity <= 0) {
            particulas.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animar);
}
animar();
