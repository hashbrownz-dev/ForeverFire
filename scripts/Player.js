class Player extends Actor {
    constructor(){
        const sprite = [
            spriteData['Player-01'],
            spriteData['Player-02'],
            spriteData['Player-03'],
            spriteData['Player-02']
        ];
        super(sprite[0]);
        this.x = viewport.width / 2;
        this.y = viewport.height - (48 * 2);
        this.health = 100;
        this.shotLevel = 1;
        this.shotCooldown = 0;
        this.speed = 3;
        this.type = 'player';
        this.frame = 0;
        this.sprite = sprite;
    }
    getBoundaries(){
        if(this.x < (this.drawW / 2) + 8) this.x = (this.drawW / 2) + 8;
        if(this.x > viewport.width - (this.drawW / 2) - 8) this.x = viewport.width - (this.drawW / 2) - 8;
        if(this.y < (this.drawH / 2) + 8) this.y = (this.drawH / 2) + 8;
        if(this.y > (viewport.height - (this.drawH / 2)) - 8) this.y = (viewport.height - ( this.drawH/2 )) - 8;
    }
    update(inputs, game){
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
                game.Projectiles.push(new PlayerShot(this.x, this.y - (this.drawH/2)))
                this.shotCooldown = 8;
            }
        }
    }
}

class PlayerShot extends Actor {
    constructor(x,y){
        const sprite = [
            spriteData['PlayerBullet-01'],
        ]
        super(sprite[0]);
        this.x = x;
        this.y = y;
        this.speed = 16;
        this.power = 1;
        this.type = 'player'
        this.sprite = sprite
    }
    update(){
        this.y-=this.speed;
        if(this.y < -32) this.health = 0;
    }
}