import { 
    StateStandingLeft, 
    StateStandingRight,
    StateRunningLeft,
    StateRunningRight,
    StateSittingLeft,
    StateSittingRight,
    StateJumpingLeft,
    StateJumpingRight,
    StateFallingLeft,
    StateFallingRight
 } from "./state.js";

 import { setGameOver } from "./gameState.js"; 

export class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 100;
            this.height = 100;
            this.spriteWidth = 200;
            this.spriteHeight = 182;
            this.x = this.width / 2;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImg');
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.maxSpeed = 5;
            this.vy = 0;
            this.weight = 0.5;
            this.staggerFrame = 5;
            this.spriteColumns = 7;
            this.heightThreshold = 20;

            this.states = [
                new StateStandingLeft(this), 
                new StateStandingRight(this),
                new StateRunningLeft(this),
                new StateRunningRight(this),
                new StateSittingLeft(this),
                new StateSittingRight(this),
                new StateJumpingLeft(this),
                new StateJumpingRight(this),
                new StateFallingLeft(this),
                new StateFallingRight(this)
            ];
            this.currentState = this.states[1];
        }

        setState(state) {
            this.currentState = this.states[state];
            this.currentState.enter();
        }

        draw(context) {
            context.beginPath();
            context.strokeStyle = 'white'; 
            context.arc(this.x + this.width / 2, this.y + this.height / 2 + 10, this.width / 2.5, 0, Math.PI * 2);
            context.stroke();

            context.beginPath();
            context.strokeStyle = 'blue';
            context.arc(this.x, this.y + 10, this.width / 2.5, 0, Math.PI * 2);
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
                const dx = (enemy.x - 10) - this.x;
                const dy = enemy.y - (this.y + 10);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < (enemy.width / 2.3 + this.width / 2.5)) {
                  setGameOver(true); 
                }
            });
            this.frameX ++;

            this.currentState.handleInput(input.lastKey);
           
            //horizontal movement
            this.x += this.speed;
            
            if (this.x < 0) this.x = 0;
            else if(this.x > this.gameWidth - this.width) {
                this.x = this.gameWidth - this.width;
            }

            //vertical movement
            this.y += this.vy;
            if(!this.onGround()) {
                this.vy += this.weight;
            } else {
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