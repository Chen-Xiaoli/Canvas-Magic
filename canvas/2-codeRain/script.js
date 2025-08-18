const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
// let gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'yellow');
gradient.addColorStop(0.4, 'green');
gradient.addColorStop(0.6, 'cyan');
gradient.addColorStop(0.8, 'blue');
gradient.addColorStop(1, 'magenta');

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize();
});

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
        this.text = '';
    }

    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.font = `${this.fontSize}px monospace`;
        context.fillStyle = gradient;
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

        if(this.y * this.fontSize > this.canvasHeight && Math.random() > 0.8) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = Math.floor(this.canvasWidth / this.fontSize);
        this.symbols = [];
        this.#initialize();
    }

    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }

    resize() {
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.columns = Math.floor(this.canvasWidth / this.fontSize);
        this.symbols = [];
        this.#initialize();
    }
}

let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;

const effect = new Effect(canvas.width, canvas.height);
function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    if (timer >= nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // semi-transparent background
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        effect.symbols.forEach(symbol => {
        symbol.draw(ctx);
    });
    } else {
        timer += deltaTime;
    }
    
    requestAnimationFrame(animate);
}

animate(0);



