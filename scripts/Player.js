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
            m : 1,
            s : 1,
            f : 1
        }
        this.BFG = 0;
        this.inv = 60;
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
        const yPos = this.y - (this.drawH/2);
        if(this.BFG){
            const dirs = [210, 240, 270, 300, 330]
            for(let i = 0; i < 5; i++){
                game.Projectiles.push(new PlayerShotF(this.x, yPos, dirs[i], 30, 80));
            }
            this.shotCooldown = 24;
            return;
        }
        const { m, s, f } = this.shotLevel;
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
                if(m >= 3){
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
                if(s >= 3){
                    dur = 40;
                    this.shotCooldown = 16;
                }
                const dirs = [210, 240, 270, 300, 330]
                for(let i = 0; i < 5; i++){
                    game.Projectiles.push(new PlayerShotS(this.x, yPos, dirs[i], dur));
                }
                break;
            case 'f':
                let bDur, bRad;
                // 1
                if(f === 1){
                    bDur = 30;
                    bRad = 80;
                    this.shotCooldown = 32;
                }
                // 2
                if(f === 2){
                    bDur = 45;
                    bRad = 100;
                    this.shotCooldown = 24;
                }
                // 3
                if(f >= 3){
                    bDur = 60;
                    bRad = 120;
                    this.shotCooldown = 16;
                }
                game.Projectiles.push(new PlayerShotF(this.x, yPos, 270, bDur, bRad));
                break;
        }
    }
    update(inputs, game){
        // update frame
        this.updateFrame();

        // Handle Shooting
        this.shotCooldown--;
        if(this.BFG) {
            this.BFG--;
            if(!this.BFG) hideTimer();
        }
        if(this.inv) {
            this.inv--;
            if(!this.inv) hideTimer();
        }

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
    draw(){
        if(this.inv && this.inv % 2){
            return;
        } else {
            renderSprite(this.sprite[this.frame], this.drawX, this.drawY, {
                xScale : this.xScale,
                yScale : this.yScale,
                dir : this.dir,
                mirrorX : this.mirrorX,
                mirrorY : this.mirrorY,
                styles : this.styles
            });
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
        this.power = 3;
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
    constructor(x,y,dir,blastDuration,blastRadius){
        const sprite = [
            sprPSF,
        ]
        super(sprite[0]);
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.speed = 8;
        this.power = 1;
        this.type = 'player';
        this.isFlame = true;
        this.sprite = sprite
        this.xScale = 1.5;
        this.yScale = 1.5;
        this.blastDuration = blastDuration;
        this.blastRadius = blastRadius;
    }
    update(game){
        this.dur --;
        moveActor(this);
        if(this.isOutOfBounds) this.health = 0;
        game.EFX.push(setEffectTrailFS(this.x + this.drawW / 4,this.y));
    }
}

class Blast {
    constructor(x,y, dur, maxRad){
        this.x = x;
        this.y = y;
        this.dur = dur;
        this.rad = 20;
        this.maxRad = maxRad;
        this.step = (this.maxRad - this.rad) / (this.dur / 2);
        this.innerD = 0;
        this.power = 1;
        this.clear = false;
        this.type = 'player';
    }
    getHitBox(){
        return {
            x : this.x - this.rad,
            y : this.y - this.rad,
            w : this.rad * 2,
            h : this.rad * 2
        }
    }
    update(game){
        this.dur--;
        this.rad += this.step;
        if(this.rad >= this.maxRad){
            this.rad = this.maxRad;
            if(!this.innerD){
                this.innerD = 20;
            }
            this.innerD += this.step;
        } 
        if(this.dur <= 0) this.clear = true;
        // Draw a small explosion somewhere within the thingy...
        const { x,y,w,h } = this.getHitBox();
        const randX = getRandom(x+w, x);
        const randY = getRandom(y+h, y);
        game.EFX.push(setEffectCircleExplosion(randX,randY, 16));
    }
    draw(){
        const divisor = explosionPalette.length - 1;
        let index = Math.floor(this.dur/divisor);
        index = index >= explosionPalette.length ? explosionPalette.length - 1 : index;
        ctx.fillStyle = explosionPalette[index];
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 7);
        // ctx.arc(this.x, this.y, this.rad * 0.9, 0, 7);
        if(this.innerD){
            ctx.arc(this.x, this.y, this.innerD, 0, 7);
        }
        ctx.fill('evenodd');
    }
}