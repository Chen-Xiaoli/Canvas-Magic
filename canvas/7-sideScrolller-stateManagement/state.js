export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    RUNNING_LEFT: 2,
    RUNNING_RIGHT: 3,
    SITTING_LEFT: 4,
    SITTING_RIGHT: 5,
    JUMPING_LEFT: 6,
    JUMPING_RIGHT: 7,
    FALLING_LEFT: 8,
    FALLING_RIGHT: 9
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class StateStandingLeft extends State {
    constructor(player) {
        super(states.STANDING_LEFT);
        this.player = player;
    }
    enter() {
        this.player.frameY = 1;
        this.player.spriteColumns = 7;
        this.player.speed = 0;
    }
    handleInput(input) {
        if (input === 'Press ArrowRight' || input === 'TouchRight') {
            this.player.setState(states.RUNNING_RIGHT);
        } 
        else if (input === 'Press ArrowLeft' || input === 'TouchLeft') this.player.setState(states.RUNNING_LEFT);
        else if (input === 'Press ArrowDown' || input === 'TouchDown') this.player.setState(states.SITTING_LEFT);
        else if (input === 'Press ArrowUp' || input === 'TouchUp')  this.player.setState(states.JUMPING_LEFT);
    }
}

export class StateStandingRight extends State {
    constructor(player) {
        super(states.STANDING_RIGHT);
        this.player = player;
    }
    enter() {
        this.player.frameY = 0;
        this.player.spriteColumns = 7;
        this.player.speed = 0;
    }
    handleInput(input) {
        if (input === 'Press ArrowLeft' || input === 'TouchLeft') this.player.setState(states.RUNNING_LEFT);
         else if (input === 'Press ArrowRight' || input === 'TouchRight') this.player.setState(states.RUNNING_RIGHT);
         else if (input === 'Press ArrowDown' || input === 'TouchDown') this.player.setState(states.SITTING_RIGHT);
         else if (input === 'Press ArrowUp' || input === 'TouchUp') this.player.setState(states.JUMPING_RIGHT);
    }
}

export class StateSittingLeft extends State {
    constructor(player) {
        super(states.SITTING_LEFT);
        this.player = player;
        }
    enter() {
        this.player.frameY = 9;
        this.player.spriteColumns = 5;
        this.player.speed = 0;
    }
    handleInput(input) {
        if(input === 'Press ArrowRight' || input === 'TouchRight') this.player.setState(states.SITTING_RIGHT);
        else if (input === 'Release ArrowDown' || input === 'Release TouchLeft' || input === 'Release TouchDown') this.player.setState(states.STANDING_LEFT);
    }
}

export class StateSittingRight extends State {
    constructor(player) {
        super(states.SITTING_RIGHT);
        this.player = player;
        }
    enter() {
        this.player.frameY = 8;
        this.player.spriteColumns = 5;
        this.player.speed = 0;
    }
    handleInput(input) {
        if(input === 'Press ArrowLeft'  || input === 'TouchLeft') this.player.setState(states.SITTING_LEFT);
        else if (input === 'Release ArrowDown' || input === 'Release TouchRight' || input === 'Release TouchDown') this.player.setState(states.STANDING_RIGHT);
    }
}


export class StateRunningLeft extends State {

    constructor(player) {
        super(states.RUNNING_LEFT);
        this.player = player;
    }
    enter() {
        this.player.frameY = 7;
        this.player.spriteColumns = 9;
        this.player.speed = -this.player.maxSpeed;
    }
    handleInput(input) {
        if (input === 'Press ArrowRight'|| input === 'TouchRight' ) {
            this.player.setState(states.RUNNING_RIGHT);
        } else if(input === 'Release ArrowLeft' || input === 'Release TouchLeft') {
            this.player.setState(states.STANDING_LEFT);
        } else if (input === 'Press ArrowDown' || input === 'TouchDown') {
            this.player.setState(states.SITTING_LEFT);
        }
    } 

}

export class StateRunningRight extends State {

    constructor(player) {
        super(states.RUNNING_RIGHT);
        this.player = player;
    }
    enter() {
        this.player.frameY = 6;
        this.player.spriteColumns = 9;
        this.player.speed = this.player.maxSpeed;
    }
    handleInput(input) {
        if (input === 'Press ArrowLeft' || input === 'TouchLeft') {
            this.player.setState(states.RUNNING_LEFT);
        } else if(input === 'Release ArrowRight' || input === 'Release TouchRight') {
            this.player.setState(states.STANDING_RIGHT);
        } else if (input === 'Press ArrowDown' || input === 'TouchDown') {
            this.player.setState(states.SITTING_RIGHT);
        }
    }

}

export class StateJumpingLeft extends State {

    constructor(player) {
        super(states.JUMPING_RIGHT);
        this.player = player;
    }
    enter() {
        this.player.frameY = 3;
        this.player.spriteColumns = 7;
        this.player.speed = -this.player.maxSpeed * 0.5;
        if(this.player.onGround()) this.player.vy = - this.player.heightThreshold;
    }
    handleInput(input) {
        if (input === 'Press ArrowRight' || input === 'TouchRight') this.player.setState(states.JUMPING_RIGHT);
        else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT);
        else if (this.player.vy > 0) this.player.setState(states.FALLING_LEFT);
    } 

}

export class StateJumpingRight extends State {

    constructor(player) {
        super(states.JUMPING_RIGHT);
        this.player = player;
    }
    enter() {
        this.player.frameY = 2;
        this.player.spriteColumns = 7;
        this.player.speed = this.player.maxSpeed * 0.5;
        if(this.player.onGround()) this.player.vy = - this.player.heightThreshold;
    }
    handleInput(input) {
        if (input === 'Press ArrowLeft') this.player.setState(states.JUMPING_LEFT);
        else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT);
        else if (this.player.vy >= 0) this.player.setState(states.FALLING_RIGHT);
    }

}

export class StateFallingLeft extends State {

    constructor(player) {
        super(states.FALLING_LEFT);
        this.player = player;
    }
    enter() {
        this.player.frameY = 5;
        this.player.spriteColumns = 7;

    }
    handleInput(input) {
         if (input === 'Press ArrowRight' || input === 'TouchRight') this.player.setState(states.FALLING_RIGHT);
         else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT);
    } 

}

export class StateFallingRight extends State {

    constructor(player) {
        super(states.FALLING_RIGHT);
        this.player = player;
    }
    enter() {
        this.player.frameY = 4;
        this.player.spriteColumns = 7;
    }
    handleInput(input) {
        if (input === 'Press ArrowLeft' || input === 'TouchLeft') this.player.setState(states.FALLING_LEFT);
         else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT);
    }

}