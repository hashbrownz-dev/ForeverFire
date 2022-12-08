class Player extends Actor {
    constructor(){
        const x = viewport.width /2;
        const y = viewport.height - (48 * 2);
        super(x,y,48,48,90,60);
        this.health = 100;
        this.shotLevel = 1;
        this.shotCooldown = 15;
        this.speed = 2;
        this.type = 'player';
        this.frame = 0;
        this.sprite = _VECT_player;
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
        this.frame++;
        if(this.frame >= this.sprite.length) this.frame = 0;
        const frame = this.sprite[this.frame];
        renderSprite(frame,this.drawX,this.drawY);
    }
}

class PlayerShot extends Actor {
    constructor(x,y){
        super(x,y,8,8,8,8);
        this.speed = 8;
        this.power = 1;
        this.type = 'player'
    }
    update(){
        this.y-=this.speed;
        if(this.y < -32) this.health = 0;
    }
    draw(){
        // OKAY... so now is the time to start rendering everything from the center.
        // There is one central center point.
        // From there, we have our hitbox
        // And from THERE, we have our sprite.
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}