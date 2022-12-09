class Player extends Actor {
    constructor(){
        const x = viewport.width /2;
        const y = viewport.height - (48 * 2);
        super(x,y,90,60,[
            [39,8,12,8],
            [20,16,50,38]
        ]);
        this.health = 100;
        this.shotLevel = 1;
        this.shotCooldown = 15;
        this.speed = 2;
        this.type = 'player';
        this.frame = 0;
        this.sprite = _VECT_player;
    }
    getBoundaries(){
        if(this.x < (this.drawW / 2) + 8) this.x = (this.drawW / 2) + 8;
        if(this.x > viewport.width - (this.drawW / 2) - 8) this.x = viewport.width - (this.drawW / 2) - 8;
        if(this.y < (this.drawH / 2) + 8) this.y = (this.drawH / 2) + 8;
        if(this.y > (viewport.height - (this.drawH / 2)) - 8) this.y = (viewport.height - ( this.drawH/2 )) - 8;
    }
    update(inputs){
        // update frame
        this.updateFrame();

        // Handle Shooting
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
}

class PlayerShot extends Actor {
    constructor(x,y){
        super(x, y, 5, 17, [ [0.5,0.5,4,16] ]);
        this.speed = 8;
        this.power = 1;
        this.type = 'player'
    }
    update(){
        this.y-=this.speed;
        if(this.y < -32) this.health = 0;
    }
    draw(){
        ctx.fillStyle = '#ffff33';
        ctx.fillRect(this.drawX, this.drawY, this.drawW, this.drawH);
    }
}