import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { isGameOver, setGameOver } from "./gameState.js";

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 720;

    let enemies = [];
    let score = 0;

    let restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', restartGame);

    let isFullscreen = false;

    const gameContainer = document.getElementById("gameContainer");
    const fullscreenBtn = document.getElementById("fullscreenBtn");

    fullscreenBtn.addEventListener("click", () => {
        if (gameContainer.requestFullscreen && !isFullscreen) {
            gameContainer.requestFullscreen();
            isFullscreen = true;
            fullscreenBtn.textContent  = 'Exit Fullscreen';
        } else if (gameContainer.webkitRequestFullscreen && !isFullscreen) {
            gameContainer.webkitRequestFullscreen();
            isFullscreen = true;
            fullscreenBtn.textContent  = 'Exit Fullscreen';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            isFullscreen = false;
            fullscreenBtn.textContent  = 'Enter Fullscreen';
        }
    });

    function restartGame() {
        enemies = [];
        score = 0;
        setGameOver(false);
        player.x = player.width / 2;
        player.setState(1);
        restartBtn.style.display = 'none';
        animate(0);
    }




    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 80;
            this.height = 80;
            this.spriteWidth = 160;
            this.spriteHeight = 119;
            this.x = Math.random() * this.spriteWidth + this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('enemyImg');
            this.frameX = 0;
            this.staggerFrame = 5;
            this.spriteColumns = 6;
            this.speed = Math.random() * 2 + 2;
        
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps; //每帧需要的时间

            this.markedForDeletion = false;
        }

        draw(context) {
            // context.strokeStyle = 'white';
            // context.strokeRect(this.x, this.y, this.width, this.height);

            context.beginPath();
            context.strokeStyle = 'white';
            context.arc(this.x + this.width / 2 - 10, this.y + this.height / 2, this.width / 2.3, 0, Math.PI * 2);
            context.stroke();

            context.beginPath();
            context.strokeStyle = 'blue';
            context.arc(this.x - 10, this.y, this.width / 2.3, 0, Math.PI * 2);
            context.stroke();
            context.drawImage(
                this.image, 
                this.frameX * this.spriteWidth,
                0, 
                this.spriteWidth, 
                this.spriteHeight,
                this.x, 
                this.y, 
                this.width, 
                this.height);
        }

        update(deltaTime) {
            // 基于deltaTime，控制动画刷新速率
            if(this.frameTimer > this.frameInterval) {
                if(this.frameX >= this.spriteColumns - 1) {
                    this.frameX = 0;
                } else {
                    this.frameX++;
                }
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }

            // 控制平移速度
            this.x -= this.speed;

            if(this.x < 0 - this.width) {
                this.markedForDeletion = true;
                score += 1;
            }
        }


        
    }
    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImg');
            this.x = 0;
            this.y = 0;

            this.width = 2400;
            this.height = 720;

            this.speed = 3;
        }

        draw(context) {
            context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, 0, 0, this.width, this.height, this.x + this.width - this.speed, this.y, this.width, this.height);
        }

        update() {
            this.x -= this.speed;
            if(this.x <= 0 - this.width) this.x = 0;
        }
    }

    function handleEnemies(deltaTime) {
       if(enemyTimer > enemyInterval) {
           enemies.push(new Enemy(canvas.width, canvas.height));
           enemyTimer = 0;
       } else {
           enemyTimer += deltaTime;
       }
       enemies.forEach(enemy => {
           enemy.draw(ctx);
           enemy.update(deltaTime);
       });
       enemies = enemies.filter(enemy => !enemy.markedForDeletion);
    }

    function displayStatusText(context){
        context.textAlign = 'left'
        context.font = '25px Helvetica';
        context.fillStyle = 'black';
        context.fillText('Score: ' + score, 20, 60);
        context.fillStyle = 'white';
        context.fillText('Score: ' + score, 22, 62);

        if(isGameOver()) {
            context.textAlign = 'center';
            context.font = '30px Helvetica';
            context.fillStyle = 'black';
            context.fillText('Game Over, Try Again!', canvas.width / 2, canvas.height / 2 - 20);
            context.fillStyle = 'white';
            context.fillText('Game Over, Try Again!', canvas.width / 2, canvas.height / 2 - 18);
            restartBtn.style.display = 'block';
        }
    }

    const input = new InputHandler();
    const bg = new Background(canvas.width, canvas.height);
    const player = new Player(canvas.width, canvas.height);
    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 3000;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bg.draw(ctx);
        bg.update();
        player.draw(ctx);
        player.update(input, enemies);
        handleEnemies(deltaTime);
        displayStatusText(ctx)
        if(!isGameOver()) requestAnimationFrame(animate);
    }

    animate(0);

})
