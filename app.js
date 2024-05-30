const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const raindrops = [];

class Raindrop {
    constructor(x, y, length, velocity) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = 'rgba(174,194,224,0.5)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    update() {
        this.y += this.velocity;
        if (this.y > canvas.height) {
            this.y = 0 - this.length;
            this.x = Math.random() * canvas.width;
            this.velocity = Math.random() * 4 + 4;
        }
    }
}

function createRaindrops(num) {
    for (let i = 0; i < num; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const length = Math.random() * 20 + 10;
        const velocity = Math.random() * 4 + 4;
        raindrops.push(new Raindrop(x, y, length, velocity));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    raindrops.forEach(raindrop => {
        raindrop.update();
        raindrop.draw();
    });
    requestAnimationFrame(animate);
}

createRaindrops(500);
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});