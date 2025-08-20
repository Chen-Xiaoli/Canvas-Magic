
let layersObjects = [
    { src: 'layer-1.png', speedModifier: 0.5 },
    { src: 'layer-2.png', speedModifier: 0.5 },
    { src: 'layer-3.png', speedModifier: 0.5 },
    { src: 'layer-4.png', speedModifier: 0.5 },
    { src: 'layer-5.png', speedModifier: 1 }
];
let gameSpeed = 5;


const speedLabel = document.getElementById('gameSpeedDisplay');
const speedSlider = document.getElementById('gameSpeed');
speedLabel.innerHTML = speedSlider.value;

const canvas = document.getElementById('parallaxCanvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

speedSlider.addEventListener('input', (e) => {
    speedLabel.innerHTML = e.target.value;
    gameSpeed = e.target.value;
    gameObjects.forEach(layer => {
       layer.speed = gameSpeed * layer.speedModifier;
   });
});

class Layer {
    constructor(image, speedModifier) {
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) this.x = this.width + this.x;
        this.x = this.x - this.speed;
        // this.x = gameFrame * this.speed % this.width;
    }
}

function createLayers(layersObjects) {
   const layers = [];
   layersObjects.forEach((layerObj, i) => {
       const image = new Image();
       image.src = layerObj.src;
       const layer = new Layer(image, layerObj.speedModifier);
       layers.push(layer);
   });
   return layers;
}

const gameObjects = createLayers(layersObjects);
// let gameFrame = 0;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(layer => {
       layer.update();
       layer.draw();
    });
    // gameFrame --;
    requestAnimationFrame(animate);
}

animate();