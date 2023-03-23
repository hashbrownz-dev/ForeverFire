class Actor{
    constructor(Sprite){
        const { dimensions, hitboxes } = Sprite;
        this.x = 0;
        this.y = 0;
        this.health = 1;
        this.speed = 4;
        this.drawW = Number(dimensions.drawW);
        this.drawH = Number(dimensions.drawH);
        this.hitboxes = Actor.setHitBoxes(hitboxes);
        this.frame = 0;
        this.type = '';
    }
    get clear(){
        return this.health <= 0
    }
    get isOutOfBounds(){
        return (this.x < -this.drawW || this.y < -this.drawH || this.x > viewport.width + this.drawW || this.y > viewport.height + this.drawH)
    }
    get drawX(){
        return this.x - (this.drawW/2);
    }
    get drawY(){
        return this.y - (this.drawH/2);
    }
    static setHitBox(x,y,w,h){
        return [x,y,w,h]
    }
    getHitBox(i){
        // const hitbox = this.hitboxes[i];
        const { x, y, w, h } = this.hitboxes[i];
        return {
            x: this.drawX + x,
            y: this.drawY + y,
            w,
            h
        }
    }
    getHitBoxes(){
        const hitBoxes = [];
        for(let i = 0; i < this.hitboxes.length; i++){
            hitBoxes.push(this.getHitBox(i));
        }
        return hitBoxes;
    }
    static setHitBoxes(hitboxes){
        const hbs = [];
        for(let i = 0; i < hitboxes.length; i++){
            hbs.push({
                x : Number(hitboxes[i].x),
                y : Number(hitboxes[i].y),
                w : Number(hitboxes[i].w),
                h : Number(hitboxes[i].h)
            })
        }
        return hbs;
    }
    updateFrame(){
        this.frame++;
        if(this.frame >= this.sprite.length){
            this.frame = 0;
        }
    }
    draw(){
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

// Small Planes

class EnemyPlane extends Actor{
    constructor(sprite){
        // Calls the Actor Constructor...
        super(sprite[0]);
        this.sprite = sprite;
        this.rank = 1;
        this.points = 9;
        this.invert = false;
        this.outline = '#FFFFFF';
        // this.fill?
        this.drops = 'medal';
        this.toShoot = -1;
        this.shootFunc = ()=>{console.log('No Shooting Function')};
        this.type = 'enemy';
    }
    update(game){
        this.move(game);
        this.shoot(game);
    }
    shoot(game){
        this.toShoot--;
        if(this.toShoot === 0){
            this.shootFunc(this, game);
        }
    }
    get drop(){
        if(this.drops){
            switch(this.drops){
                case 'medal':
                    return PowerUp.Medal(this.x, this.y, this.rank);
                case 'smallHealth':
                    return PowerUp.SmallHealth(this.x,this.y);
                case 'largeHealth':
                    return PowerUp.LargeHealth(this.x,this.y);
                case 'extraLife':
                    return PowerUp.ExtraLife(this.x, this.y);
                case 'speedUp':
                    return PowerUp.SpeedUp(this.x, this.y);
                case 'speedDown':
                    return PowerUp.SpeedDown(this.x, this.y);
                case 'weaponM':
                    return PowerUp.WeaponM(this.x, this.y);
                case 'weaponF':
                    return PowerUp.WeaponF(this.x, this.y);
                case 'weaponS':
                    return PowerUp.WeaponS(this.x, this.y);
                case 'BFG':
                    return PowerUp.BFG(this.x, this.y);
                case 'invincibility':
                    return PowerUp.Invincibility(this.x, this.y);
            }
        } else {
            return null;
        }
    }
}

// The Kamikaze plane should bank towards the player.  The distance between the two actors on the x axis determines the xSpeed of the kamikaze plane.

class Kamikaze extends EnemyPlane{
    constructor(invert){
        const sprite = [
            spriteData['Kamikaze-01'],
            spriteData['Kamikaze-02'],
            spriteData['Kamikaze-03']
        ];
        super(sprite);
        this.x = getRandom(100, 700);
        this.y = invert ? viewport.height + this.drawH : -this.drawH;
        this.invert = invert;
        this.mirrorX = false;
        this.mirrorY = !invert;
        this.distance;
        this.xSpeed = 1.5;
        this.fill = '#EC1E24';
    }
    move(game){
        // Set our initial distance
        if (!this.distance) {
            if(game.Player){
                this.distance = Math.abs(this.x - game.Player.x);
            }
        }

        // MOVEMENT

        if(this.invert){
            this.y -= this.speed;
            if(this.y < -this.drawH) this.health = 0;
        } else {
            this.y += this.speed;
            if(this.drawY > viewport.height) this.health = 0;
        }
        
        this.frame = 0;
        if(game.Player){
            let x = game.Player.x;

            const currentDistance = Math.abs(this.x - x);
            const delta = currentDistance / this.distance;
            const xSpeed = this.xSpeed * delta;

            if(delta >=0.375) this.frame = 1;
            if(delta >= 0.75) this.frame = 2;       

            // Go Right
            if( this.x < x) {
                this.x += xSpeed;
                this.mirrorX = false;
            }
            // Go Left
            if( this.x > x) {
                this.x -= xSpeed;
                this.mirrorX = true;
            }
        }

        // EFX

        const emitX = this.drawX + 27;
        const emitY = this.invert ? this.drawY + this.drawH + 5 : this.drawY - 5;
        game.EFX.push(setEffectTrailKamikaze(emitX,emitY));
    }
}

// PotShots fly Vertically, shooting at the player.
// PotShots have a form property, which determines their start location and attack pattern
// Basic potshots fly from top to bottom and fire shots directly at the player
// Spread potshots fly from top to bottom and fire shots in patterns
// Inverted potshots fly from bottom to top and fire shots directly at the player
// Hybrid potshots have the behaviors of inverted and Spread potshots...
// Psycho can appear either from the top or bottom, and shoot bullets in circular patterns.  guaranteed to drop a power up

class PotShot extends EnemyPlane{
    constructor(invert){
        const sprite = [
            spriteData['PotShot-01'],
            spriteData['PotShot-02'],
            spriteData['PotShot-03'],
            spriteData['PotShot-02']
        ]
        super(sprite);
        this.x = getRandom(200, 600);
        this.y = !invert ? -this.drawH : viewport.height + this.drawH;
        this.invert = invert;
        this.mirrorY = invert;
        this.fill = '#EC1C24';

        // Invert HitBox
        if(this.invert){
            const hb = this.hitboxes[0];
            hb.y = this.drawH - (hb.y + hb.h);
        }
    }

    move(game){
        this.updateFrame();
        if(this.invert){
            this.y -= this.speed;
            if( this.y < -this.drawH ) this.health = 0;
        } else {
            this.y += this.speed;
            if( this.drawY > viewport.height ) this.health = 0;
        }
    }
}

class Ace extends EnemyPlane{
    constructor(y, spawnLeft, keyFrames){
        const sprite = [
            spriteData['SmDyna-01']
        ];
        super(sprite);
        this.x = spawnLeft ? 0 : viewport.width;
        this.y = y;
        this.dir = spawnLeft ? 0 : 180;
        this.keyFrames = keyFrames;
        const { action, duration } = this.keyFrames.shift();
        this.action = action;
        this.timer = duration;
        this.fill = '#ED1C24';
    }

    move(game){
        // Update Action

        this.timer--;
        if(this.timer === 0 ){
            if(!this.keyFrames.length){
                this.timer = -1;
            } else {
                const { duration, action } = this.keyFrames.shift();
                this.timer = duration;
                this.action = action;
            }
        }

        // Perform Action

        this.action(this);
        moveActor(this);

        // Clean Up

        if(this.timer < 0 && this.isOutOfBounds){
            this.health = 0;
        }
    }

    static setKeyFrame( turnDegree, duration ){
        const interval = turnDegree / duration;
        return {
            duration: duration,
            action: (ace) => {
                turnActor(ace, interval)
            }
        }
    }

    static spawn( spawnLeft = true ){
        // Set Y
        const { drawH } = spriteData['SmDyna-01']['dimensions'];
        const y = drawH * 2;
        // Set Key Frames
        const keyFrames = [
            Ace.setKeyFrame(0, 70),
            Ace.setKeyFrame(-180,180),
            Ace.setKeyFrame(0,1)
        ]
        // return new Ace
        return new Ace(y, spawnLeft, keyFrames, 120, shootAtPlayer(120, 5));
    }
}
// Medium Plane

// Gunner's can have variable health

class Gunner extends EnemyPlane{
    constructor(invert){
        const sprite = [
            spriteData['MidPlane2-01'],
            spriteData['MidPlane2-02'],
            spriteData['MidPlane2-03'],
            spriteData['MidPlane2-02']
        ]
        super(sprite);
        this.x = getRandom(200, 600);
        this.y = invert ? viewport.height + 8 : -8;
        this.maxHealth;
        this.emitters = [];
        this.fill = '#EC1E24';
    }
    move(game){
        this.updateFrame();
        if(this.invert){
            this.y -= this.speed;
            if( this.y < -this.drawH ) this.health = 0;
        } else {
            this.y += this.speed;
            if( this.drawY > viewport.height ) this.health = 0;
        }

        // HULL DAMAGE
        for(const emitter of this.emitters){
            const emitX = this.x + emitter[0];
            const emitY = this.y + emitter[1];
            game.EFX.push(setEffectTrailBurn(emitX,emitY));
        }
    }
}

class EnemyShot extends Actor {
    constructor(x,y,dir,speed){
        const sprite = [
            spriteData['EnemyBulletRound-01']
        ];
        super(sprite[0]);
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.power = 25;
        this.dir = dir ? dir : 0;
        this.speed = speed ? speed : 2;
        this.type = 'enemy';
    }
    update(game){
        moveActor(this);
        if(this.isOutOfBounds){
            this.health = 0;
        }
    }
}