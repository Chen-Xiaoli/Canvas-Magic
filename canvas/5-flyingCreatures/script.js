/** @type {HTMLCanvasElement} */ 
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 400;
const CANVAS_HEIGHT = canvas.height = 600;

let gameFrame = 0;

class Enemy {
    constructor(image, x, y, spriteWidth, spriteHeight, dWidth, dHeight) {

        this.image = image;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.loopFrame = 6;
        this.imageIdx = 0;

        this.width = dWidth;
        this.height = dHeight;

        this.enemy1X = x;
        this.enemy1Y = y;
        this.enemy1Speed = 2;

        this.enemy2X = x;
        this.enemy2Y = y;
        this.angle = 0; // Random angle for sine wave movement
        this.angleSpeed = Math.random() * 0.2; // Random speed for sine wave movement
        this.enemy2Speed = Math.random() * 4 + 1; // Random speed for enemy 2
        this.curve = Math.random() * 7;


        this.enemy3X = x;
        this.enemy3Y = y;
        this.angleSpeed3 = Math.random() * 2 + 0.5; // Random speed for sine wave movement
        this.curve3 = Math.random() * 200;

        this.enemy4X = x;
        this.enemy4Y = y;
        this.enemy4NewX = Math.random() * (CANVAS_WIDTH - this.width);
        this.enemy4NewY = Math.random() * (CANVAS_HEIGHT - this.height);
        this.interval = Math.floor(Math.random() * 200 + 50); // Random interval for enemy 4 movement
    }

    draw(context) {
        let frameX = Math.floor(gameFrame / this.enemy1Speed) % this.loopFrame;
        // context.drawImage(this.image, frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.enemy1X, this.enemy1Y, this.width, this.height);

        // context.drawImage(this.image, frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.enemy2X, this.enemy2Y, this.width, this.height);

        // context.drawImage(this.image, frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.enemy3X, this.enemy3Y, this.width, this.height);

        context.drawImage(this.image, frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.enemy4X, this.enemy4Y, this.width, this.height);
    }

    update() {

        this.enemy1X += Math.random() * 4 - 2; 
        this.enemy1Y += Math.random() * 4 - 2;

        if(this.enemy2X + this.width < 0) this.enemy2X = CANVAS_WIDTH;
        else this.enemy2X -= this.enemy2Speed;
        this.enemy2Y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed

        if(gameFrame % this.interval === 0) {
            this.enemy4NewX = Math.random() * (CANVAS_WIDTH - this.width);
            this.enemy4NewY = Math.random() * (CANVAS_HEIGHT - this.height);
        }

        // if(this.enemy4X + this.width < 0) this.enemy4X = CANVAS_WIDTH;
        // if(this.enemy4Y + this.height < 0) this.enemy4Y = CANVAS_HEIGHT;
        // let dx =  this.enemy4X - this.enemy4NewX;
        // let dy = this.enemy4Y - this.enemy4NewY;
        let dx = this.enemy4NewX - this.enemy4X;
        let dy = this.enemy4NewY - this.enemy4Y;
        this.enemy4X += dx / 70; // Move towards the new position
        this.enemy4Y += dy / 70; // Move towards the new position

    }

}

function createEnemies( image, numEnemies, spriteWidth, spriteHeight, dWidth = 0, dHeight = 0) {
    const enemies = [];
    for (let i = 0; i < numEnemies; i++) {
        const x = Math.random() * (CANVAS_WIDTH - dWidth);
        const y = Math.random() * (CANVAS_HEIGHT - dHeight);
        enemies.push(new Enemy(image, x, y, spriteWidth, spriteHeight, dWidth, dHeight));
    }
    return enemies;
}

const enemy1Img = new Image();
enemy1Img.src = 'enemy1.png';
const enemy1 = createEnemies( enemy1Img, 50, 293, 155, 80, 80);


// const enemy2Img = new Image();
// enemy2Img.src = 'enemy2.png';
// const enemy2 = createEnemies( enemy2Img, 10, 266, 188, 80, 80);

// const enemy3Img = new Image();
// enemy3Img.src = 'enemy3.png';
// const enemy3 = createEnemies( enemy3Img, 10, 218, 177, 80, 80);

const enemy4Img = new Image();
enemy4Img.src = 'enemy4.png';
const enemy4 = createEnemies( enemy4Img, 10, 213, 212, 80, 80);

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // enemy1.forEach(enemy => {
    //     enemy.update();
    //     enemy.draw(ctx);
    // });

    // enemy2.forEach(enemy => {
    //     enemy.update();
    //     enemy.draw(ctx);
    // });

    // enemy3.forEach(enemy => {
    //     enemy.update();
    //     enemy.draw(ctx);
    // });

    enemy4.forEach(enemy => {
        enemy.update();
        enemy.draw(ctx);
    });

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();