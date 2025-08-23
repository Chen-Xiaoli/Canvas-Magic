window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 720;

    let enemies = [];
    let score = 0;
    let gameOver = false;

    class InputHandler {
        constructor() {
            this.keys = [];
            window.addEventListener('keydown', (e) => {
                e.preventDefault();
                if ((e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }
            });       
            window.addEventListener('keyup', (e) => {
                 e.preventDefault();
                if (this.keys.indexOf(e.key) > -1) {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
           
        }
    }

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 100;
            this.height = 100;
            this.spriteWidth = 575;
            this.spriteHeight = 523;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImg');
            this.frameX = 0;
            this.frameY = 3;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
            this.staggerFrame = 5;
            this.spriteColumns = 9;
        }

        draw(context) {
            context.strokeStyle = 'white'; 
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.beginPath();
            context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            context.stroke();
            context.beginPath();
            context.strokeStyle = 'blue';
            context.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
            context.stroke();
            context.drawImage(
                  this.image,
                  Math.floor(this.frameX / this.staggerFrame) % this.spriteColumns * this.spriteWidth,
                  this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
        }
        update(input, enemies) {
            // collision detection
            enemies.forEach(enemy => {
                const dx = enemy.x - this.x;
                const dy = enemy.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < enemy.width / 2 + this.width / 2) {
                  gameOver = true;   
                }
            });
            this.frameX ++;
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
            } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.vy -= 30;
            } else {
                this.speed = 0;
            }
            this.x += this.speed;
            
            if (this.x < 0) this.x = 0;
            else if(this.x > this.gameWidth - this.width) {
                this.x = this.gameWidth - this.width;
            }

            this.y += this.vy;
            if(!this.onGround()) {
                this.vy += this.weight;
                this.frameY = 1;
                this.spriteColumns = 7;
            } else {
                this.frameY = 3;
                this.vy = 0;
            }
            if(this.y > this.gameHeight - this.height) {
                this.y = this.gameHeight - this.height;
            }
        }

        onGround() {
            return this.y >= this.gameHeight - this.height;
        }
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
            context.strokeStyle = 'white';
            context.strokeRect(this.x, this.y, this.width, this.height);

            context.beginPath();
            context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            context.stroke();

            context.beginPath();
            context.strokeStyle = 'blue';
            context.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
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

            this.speed = 5;
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
        context.font = '25px Helvetica';
        context.fillStyle = 'black';
        context.fillText('Score: ' + score, 20, 60);
        context.fillStyle = 'white';
        context.fillText('Score: ' + score, 22, 62);

        if(gameOver) {
            context.textAlign = 'center';
            context.font = '30px Helvetica';
            context.fillStyle = 'black';
            context.fillText('Game Over, Try Again!', canvas.width / 2, canvas.height / 2 - 20);
            context.fillStyle = 'white';
            context.fillText('Game Over, Try Again!', canvas.width / 2, canvas.height / 2 - 18);
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
        // bg.update();
        player.draw(ctx);
        player.update(input, enemies);
        handleEnemies(deltaTime);
        displayStatusText(ctx)
        if(!gameOver) requestAnimationFrame(animate);
    }

    animate(0);

})
