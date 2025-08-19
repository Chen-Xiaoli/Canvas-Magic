let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', (event) => {
    playerState = event.target.value;
});


const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600; 
const CANVAS_HEIGHT = canvas.height = 600;


const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = {};
const animations = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }

];
const animationNames = animations.map(a => a.name);
let currentAnimationIndex = 0;

// Automatically change playerState every 2 seconds
setInterval(() => {
    currentAnimationIndex = (currentAnimationIndex + 1) % animationNames.length;
    playerState = animationNames[currentAnimationIndex];
    dropdown.value = playerState; // Optional: update dropdown UI if present
}, 2000);

animations.forEach((animation, index) => {
    let frames = {
        loc: []
    };
    for (let j = 0; j < animation.frames; j++) {
        let x = j * spriteWidth;
        frames.loc.push({ x, y: index * spriteHeight });
    }
    spriteAnimations[animation.name] = frames;
});



function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length; 
    let frameX = position * spriteWidth;
    let frameY = spriteAnimations[playerState].loc[position].y;
    gameFrame++;
    ctx.drawImage(playerImage, frameX , frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    requestAnimationFrame(animate);
}

playerImage.onload = animate;