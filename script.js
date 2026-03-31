const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const text = "Edu kbrazo y agarra mi webo "; 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let time = 0; 
let points = [];
const scale = 13; // Lo agrandé un pelín para que luzca más
const numPoints = 1500; 

// 1. Calculamos los puntos del corazón
for (let i = 0; i < numPoints; i++) {
    let t = (i / numPoints) * Math.PI * 2;
    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
    points.push({ 
        x: x * scale + canvas.width / 2, 
        y: -y * scale + canvas.height / 2 
    });
}

function draw() {
    // Fondo negro con rastro
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FF0000'; 
    ctx.font = 'bold 13px Arial'; 
    ctx.shadowBlur = 12; 
    ctx.shadowColor = 'red';

    // 2. RELLENO TOTAL (Aquí está el cambio clave)
    // Bajé el step de 25 a 10. Ahora hay 2.5 veces más letras que antes.
    const step = 12; 

    for (let i = 0; i < numPoints; i += step) {
        // El movimiento de rotación lento
        let pointIndex = Math.floor(i + time) % numPoints;
        const point = points[pointIndex];
        
        // Efecto de ondulación suave
        const wave = Math.sin(time * 0.05 + i) * 3;
        
        ctx.fillText(text, point.x + wave, point.y + wave);
    }

    // Velocidad de la rotación (0.6 es un balance entre lento y fluido)
    time += 0.6; 

    requestAnimationFrame(draw);
}

draw();
