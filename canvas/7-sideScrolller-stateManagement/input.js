export class InputHandler {
        constructor() {
            this.keys = [];
            this.lastKey = '';
            this.touchStartY = '';
            this.touchStartX = '';
            this.touchThreshold = 10;   
            window.addEventListener('keydown', (e) => {
                e.preventDefault();
                if ((e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                    this.lastKey = 'Press ' + e.key;
                }
            });       
            window.addEventListener('keyup', (e) => {
                 e.preventDefault();
                if (this.keys.indexOf(e.key) > -1) {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                    this.lastKey = 'Release ' + e.key;
                }
            });

            window.addEventListener('touchstart', (e) => {
                this.touchStartY =  e.touches[0].pageY;
                this.touchStartX =  e.touches[0].pageX;
            });

            window.addEventListener('touchmove', (e) => {
                const touchY = e.touches[0].pageY;
                const touchX = e.touches[0].pageX;
                const distanceY = touchY - this.touchStartY;
                const distanceX = touchX - this.touchStartX;

                if (- distanceY > this.touchThreshold) {
                    if (this.keys.indexOf('TouchUp') === -1) {
                        this.keys.push('TouchUp');
                        this.lastKey = 'TouchUp';
                    }
                } else if (distanceY > this.touchThreshold) {
                    if (this.keys.indexOf('TouchDown') === -1) {
                        this.keys.push('TouchDown');
                        this.lastKey = 'TouchDown';
                    }
                } 

                if (distanceX > this.touchThreshold) {
                    if (this.keys.indexOf('TouchRight') === -1) {
                        this.keys.push('TouchRight');
                        this.lastKey = 'TouchRight';
                    }
                } else if (-distanceX > this.touchThreshold) {
                    if (this.keys.indexOf('TouchLeft') === -1) {
                        this.keys.push('TouchLeft');
                        this.lastKey = 'TouchLeft';
                    }
                }
                console.log(this.keys);
            });

            window.addEventListener('touchend', (e) => {
               
                if (this.keys.indexOf('TouchUp') > -1) {
                    this.keys.splice(this.keys.indexOf('TouchUp'), 1);
                    this.lastKey = 'Release TouchUp';
                }
                if (this.keys.indexOf('TouchDown') > -1) {
                    this.keys.splice(this.keys.indexOf('TouchDown'), 1);
                    this.lastKey = 'Release TouchDown';
                }
                if (this.keys.indexOf('TouchRight') > -1) {
                    this.keys.splice(this.keys.indexOf('TouchRight'), 1);
                     this.lastKey = 'Release TouchRight';
                }
                if (this.keys.indexOf('TouchLeft') > -1) {
                    this.keys.splice(this.keys.indexOf('TouchLeft'), 1);
                     this.lastKey = 'Release TouchLeft';
                }
            });
        }
}