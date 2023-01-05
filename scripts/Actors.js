class Actor{
    constructor(Sprite){
        const { dimensions, hitboxes } = Sprite;
        this.x = 0;
        this.y = 0;
        this.drawW = dimensions.drawW;
        this.drawH = dimensions.drawH;
        this.hitboxes = hitboxes;
        this.health = 1;
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
        const hitbox = this.hitBoxes[i];
        return {
            x: this.drawX + hitbox[0],
            y: this.drawY + hitbox[1],
            w: hitbox[2],
            h: hitbox[3]
        }
    }
    getHitBoxes(){
        const hitBoxes = [];
        for(let i = 0; i < this.hitBoxes.length; i++){
            hitBoxes.push(this.getHitBox(i));
        }
        return hitBoxes;
    }
    updateFrame(){
        this.frame++;
        if(this.frame >= this.sprite.length){
            this.frame = 0;
        }
    }
    draw(){
        renderSprite(this.sprite[this.frame], this.x, this.y, {
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
    constructor(sprite, toShoot = -1, shootFunc){
        // Calls the Actor Constructor...
        super(sprite[0]);
        this.sprite = sprite;
        this.toShoot = toShoot;
        this.shootFunc = shootFunc ? shootFunc : ()=>{console.log('No Shooting Function')};
        this.type = 'enemy'
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
}

// The Kamikaze plane should bank towards the player.  The distance between the two actors on the x axis determines the xSpeed of the kamikaze plane.

class Kamikaze extends EnemyPlane{
    constructor(x, invert, toShoot = -1, shootingFunc){
        const sprite = [
            spriteData['Kamikaze-01'],
            spriteData['Kamikaze-02'],
            spriteData['Kamikaze-03']
        ];
        super(sprite, toShoot, shootingFunc);
        this.x = x;
        this.y = invert ? viewport.height + this.drawH : -this.drawH;
        this.speed = 4;
        this.points = 9;
        this.invert = invert;
        this.mirrorX = false;
        this.mirrorY = invert;
        this.distance;
        this.xSpeed = 1.5;
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
        
        if(game.Player){
            let x = game.Player.x;

            const currentDistance = Math.abs(this.x - x);
            const delta = currentDistance / this.distance;
            const xSpeed = this.xSpeed * delta;

            this.frame = 0;
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

    static spawn(invert = false){
        const x = Math.floor(Math.random() * (viewport.width - 50) + 50);
        return new Kamikaze(x, invert);
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
    constructor(x, invert, toShoot = -1, shootFunc){
        const sprite = [
            spriteData['PotShot-01'],
            spriteData['PotShot-02'],
            spriteData['PotShot-03'],
            spriteData['PotShot-02']
        ]
        super(sprite, toShoot, shootFunc);
        this.x = x;
        this.y = !invert ? -this.drawH : viewport.height + this.drawH;
        this.speed = 2.5;
        this.points = 14;
        this.invert = invert;
        this.mirrorY = invert;
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

    static spawn(invert = false){
        // x, invert, toShoot, shootFunc
        const { drawW } = spriteData['PotShot-01']['dimensions'];
        const x = Math.floor(Math.random() * (viewport.width - (drawW + 10)) + (drawW + 10));

        return new PotShot(x, invert, 120, shootAtPlayer(60, 5, 90));
    }
}

class Ace extends EnemyPlane{
    constructor(y, spawnLeft, keyFrames, toShoot = -1, shootFunc){
        const sprite = [
            spriteData['SmDyna-01']
        ];
        super(sprite, toShoot, shootFunc);
        this.x = spawnLeft ? 0 : viewport.width;
        this.y = y;
        this.speed = 4;
        this.dir = spawnLeft ? 0 : 180;
        this.points = 19;
        this.keyFrames = keyFrames;
        const { action, duration } = this.keyFrames.shift();
        this.action = action;
        this.timer = duration;
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
    constructor(x, health = 10, toShoot = -1, shootingFunc){
        const sprite = [
            spriteData['MidPlane2-01'],
            spriteData['MidPlane2-02'],
            spriteData['MidPlane2-03'],
            spriteData['MidPlane2-02']
        ]
        super(sprite, toShoot, shootingFunc);
        this.speed = 1;
        this.health = health;
        this.maxHealth = this.health;
        this.y = viewport.height + 8;
        this.points = 50;
        this.toShoot = toShoot;
        this.emitters = [];
    }
    move(game){
        this.updateFrame();
        this.y -= this.speed;
        if(this.speed > 0 ){
            if( this.y < -this.drawH ) this.health = 0;
        } else {
            if( this.drawY > viewport.height ) this.health = 0;
        }

        // HULL DAMAGE

        for(const emitter of this.emitters){
            const emitX = this.x + emitter[0];
            const emitY = this.y + emitter[1];
            game.EFX.push(setEffectTrailBurn(emitX,emitY));
        }
    }

    static spawn(x = 300){
        return new Gunner(x, 10, 120, shootAtPlayer(60, 5, 270));
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
        this.power = 36;
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