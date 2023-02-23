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
        this.shotType = 'f';
        this.shotLevel = {
            m : 1,
            s : 1,
            f : 1
        }
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
    shoot(game){
        const { m, s, f } = this.shotLevel;
        const yPos = this.y - (this.drawH/2);
        let dur;
        switch(this.shotType){
            case 'm':
                const margin = 12;
                // 1 - Create One Bullet
                if(m === 1){
                    game.Projectiles.push(new PlayerShotM(this.x, yPos))
                }
                // 2 - Create Two Bullets
                if(m >= 2){
                    game.Projectiles.push(new PlayerShotM(this.x - margin, yPos));
                    game.Projectiles.push(new PlayerShotM(this.x + margin, yPos));
                }
                // 3 - Create Three Bullets
                if(m === 3){
                    game.Projectiles.push(new PlayerShotM(this.x - (margin * 2), yPos));
                    game.Projectiles.push(new PlayerShotM(this.x + (margin * 2), yPos));
                }
                this.shotCooldown = 8;
                break;
            case 's':
                // 1
                if(s === 1){
                    dur = 25;
                    this.shotCooldown = 30;
                }
                // 2
                if(s === 2){
                    dur = 30;
                    this.shotCooldown = 24;
                }
                // 3
                if(s === 3){
                    dur = 40;
                    this.shotCooldown = 16;
                }
                const dirs = [210, 240, 270, 300, 330]
                for(let i = 0; i < 5; i++){
                    game.Projectiles.push(new PlayerShotS(this.x, yPos, dirs[i], dur));
                }
                break;
            case 'f':
                // 1
                if(s === 1){
                    dur = 25;
                    this.shotCooldown = 45;
                }
                // 2
                if(s === 2){
                    dur = 30;
                    this.shotCooldown = 24;
                }
                // 3
                if(s === 3){
                    dur = 40;
                    this.shotCooldown = 16;
                }
                game.Projectiles.push(new PlayerShotF(this.x, yPos, 270));
                break;
        }
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
                this.shoot(game);
            }
        }
    }
}

class PlayerShotM extends Actor {
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

class PlayerShotS extends Actor {
    constructor(x,y,dir,dur){
        const sprite = [
            sprPSS,
        ]
        super(sprite[0]);
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.dur = dur;
        this.speed = 12;
        this.power = 1;
        this.type = 'player'
        this.sprite = sprite
    }
    update(){
        this.dur--;
        moveActor(this);
        if(this.isOutOfBounds || this.dur <= 0) this.health = 0;
    }
}

class PlayerShotF extends Actor {
    constructor(x,y,dir){
        const sprite = [
            sprPSF,
        ]
        super(sprite[0]);
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.speed = 16;
        this.power = 1;
        this.type = 'player';
        this.isFlame = true;
        this.sprite = sprite
        this.xScale = 1.5;
        this.yScale = 1.5;
    }
    update(){
        this.dur --;
        moveActor(this);
        if(this.isOutOfBounds) this.health = 0;
    }
}

class Blast {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.dur = 10;
        this.rad = 20;
        this.clear = false;
        this.type = 'blast';
    }
    update(){
        this.dur--;
        this.rad+=8;
        if(this.dur <= 0) this.clear = true;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.arc(this.x, this.y, this.rad, 0, 7);
        ctx.fill();
    }
}