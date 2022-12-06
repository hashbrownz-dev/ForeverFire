class Player {
    constructor(){
        this.health = 100;
        this.shotLevel = 1;
        this.shotCooldown = 15;
        this.x = 0;
        this.y = 0;
        this.w = 48;
        this.h = 48;
        this.speed = 2;
        this.type = 'player';
    }
    getBoundaries(){
        if(this.x < 8) this.x = 8;
        if(this.x > viewport.width - (this.w + 8)) this.x = viewport.width - (this.w + 8);
        if(this.y < 8) this.y = 8;
        if(this.y > viewport.height - (this.h + 8)) this.y = viewport.height - (this.h+8);
    }
    update(inputs){
        this.shotCooldown--;

        const { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, z } = inputs;
        if(ArrowUp) this.y -= this.speed;
        if(ArrowLeft) this.x -= this.speed;
        if(ArrowDown) this.y += this.speed;
        if(ArrowRight) this.x += this.speed;
        this.getBoundaries();
        if(z){
            //if z is held down... the player needs to check if it can fire or not...
            if(this.shotCooldown <= 0){
                this.shotCooldown = 15;
                return true;
            }
        }
        return false;
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class PlayerShot {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.w = 8;
        this.h = 8;
        this.speed = 8;
        this.type = 'player'
        this.clear = false;
    }
    update(){
        this.y-=this.speed;
        if(this.y < -32) this.clear = true;
    }
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}