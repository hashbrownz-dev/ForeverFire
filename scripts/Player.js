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
        this.shotType = 'm';
        this.shotLevel = {
            m : 3,
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
        switch(this.shotType){
            case 'm':
                const margin = 12;
                const yPos = this.y - (this.drawH/2);
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
                // 2
                // 3
                break;
            case 'f':
                // 1
                // 2
                // 3
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

class PlayerShotF extends Actor {
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