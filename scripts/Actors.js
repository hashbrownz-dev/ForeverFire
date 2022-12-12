class Actor{
    constructor(x,y,dw,dh,hitBoxes){
        this.x = x;
        this.y = y;
        this.drawW = dw;
        this.drawH = dh;
        this.hitBoxes = hitBoxes;
        this.health = 1;
        this.frame = 0;
        this.type = 'enemy';
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
    get boundingRect(){
        return {
            x: this.x - (this.w/2),
            y: this.y - (this.h/2),
            w: this.w,
            h: this.h
        }
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
        const frame = this.sprite[this.frame];
        renderSprite(frame, this.drawX, this.drawY, this.drawW, this.drawH, this.dir, this.mirrorX, this.mirrorY);
    }
}

// Small Planes

class SmallPlane extends Actor{
    constructor(x,y,dw,dh,hitBoxes){
        super(x,y,dw,dh,hitBoxes);
        this.speed = 2;
    }
}

// The Kamikaze plane should bank towards the player.  The distance between the two actors on the x axis determines the xSpeed of the kamikaze plane.

class Kamikaze extends SmallPlane{
    constructor(x, invert){
        super(x,0,54,56,[ [15,16,24,24] ]);
        this.y = invert ? viewport.height + this.drawH : -this.drawH;
        this.speed = 4;
        this.distance;
        this.xSpeed = 1.5;
        this.points = 9;
        this.sprite = _VECT_Kamikaze;
        this.mirrorX = false;
        this.invert = invert;
        this.mirrorY = invert;
    }
    update(game){
        // Set our initial distance
        if (!this.distance) {
            if(game.Player){
                this.distance = Math.abs(this.x - game.Player.x);
            }
        }

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

class PotShot extends SmallPlane{
    constructor(x, form, invert){
        super(x, 0, 54, 56, [ [9,10,36,36] ]);
        this.y = !invert ? -this.drawH : viewport.height + this.drawH;
        this.speed = 2.5;
        this.points = 14;
        this.shotCooldown = 120;
        this.form = form;
        this.invert = invert;
        this.mirrorY = invert;
        this.sprite = _VECT_PotShot;
    }
    update(game){
        this.updateFrame();

        // update position

        if(this.invert){
            this.y -= this.speed;
            if(this.y < -this.drawH)this.health = 0;
        } else {
            this.y += this.speed;
            if(this.drawY > viewport.height)this.health = 0;
        }

        // update shotCooldown
        this.shotCooldown--;

        // type specific behavior
        switch(this.form){
            case 'basic':
                // Shoot a single bullet targeting the player
                if(this.shotCooldown <= 0){
                    if(game.Player){
                        game.Projectiles.push(new EnemyShot(this.x,this.y, getDirection(this, game.Player), 5));
                    }
                    this.shotCooldown = 60;
                }
                break;
            case 'spread':
                // Shoot a spread Shot
                if(this.shotCooldown <= 0){
                    this.shotCooldown = 90;
                    // Determine if we fire upwards or downwards
                    const centershot = this.invert ? 270 : 90,
                        speed = 4;

                    // Create our three shots
                    const shots = [
                        new EnemyShot(this.x, this.y, centershot, speed),
                        new EnemyShot(this.x, this.y, centershot - 30, speed),
                        new EnemyShot(this.x, this.y, centershot + 30, speed)
                    ];
                    shots.forEach( shot => game.Projectiles.push(shot));
                }
                break;
            case 'psycho':
                // Shoot in a circle (8 shots?)
                if(this.shotCooldown <= 0){
                    this.shotCooldown = 120;
                    for(let i = 0; i < 360; i+= 45){
                        game.Projectiles.push( new EnemyShot(this.x, this.y, i, 1.5) )
                    }
                }
                break;
        }
    }
    static spawn(x, form){
        let f, invert;
        switch (form){
            case 'basic':
                f = form;
                invert = false;
                break;
            case 'spread':
                f = form;
                invert = false;
                break;
            case 'inverted':
                f = 'basic';
                invert = true;
                break;
            case 'hybrid':
                f = 'spread';
                invert = true;
                break;
            case 'psycho':
                f = form;
                invert = Math.round(Math.random()) ? true : false;
                break;
        }
        return new PotShot(x, f, invert);
    }
}

class Ace extends SmallPlane{
    constructor(y,spawnLeft,keyFrames){
        super(0, y, 56, 56, [ [7,7,42,42] ]);
        this.x = spawnLeft ? 0 : viewport.width;
        this.speed = 4;
        this.dir = spawnLeft ? 0 : 180;
        this.points = 19;
        this.currentKeyFrame = 0;
        this.keyFrames = keyFrames;
        this.timer = this.keyFrames[this.currentKeyFrame].duration;
        this.action = this.keyFrames[this.currentKeyFrame].action;
        this.sprite = _VECT_SmallDyna;
    }
    update(game){
        // Update Time
        this.timer --;
        if(this.timer === 0){
            this.currentKeyFrame++;
            // Once all keyFrames have been executed
            if(this.currentKeyFrame >= this.keyFrames.length){
                this.timer = -1;
                // perform the last action indefinitely
            } else {
                const { duration, action } = this.keyFrames[this.currentKeyFrame];
                // Reset timer
                this.timer = duration;
                this.action = action;
            }
        }
        // Perform Action
        this.action(this);
        // action is a function that performs side effects on this
        // function(this){ this.x = 1; this.y = 20 }

        // Shoot

        // Perform Clean Up
        if(this.timer < 0 && this.isOutOfBounds){
            this.health =  0;
        }
    }
    static setKeyFrame( turnDegree, duration ){
        const interval = turnDegree / duration;
        return {
            duration: duration,
            action: (ace) => {
                turn(ace, interval);
                move(ace);
            }
        }
    }
}
// Medium Plane

class MidPlane extends Actor{
    constructor(x, dw, dh, hitBoxes){
        const spawnY = viewport.height + 8;
        super(x, spawnY, dw, dh, hitBoxes);
    }
}

class MGPlane extends MidPlane{
    constructor(x){
        super(x, 111, 90, [
            [0.5, 23, 110, 14],
            [33.5, 37, 44, 7],
            [47, 44, 17, 41]
        ]);
        this.speed = 1;
        this.health = 10;
        this.maxHealth = this.health;
        this.y = viewport.height + 8;
        this.points = 50;
        this.toShoot = 60;
        this.target = 270;
        this.sprite = _VECT_MidPlane;
        this.emitters = [];
    }
    update(game){
        // Check if it can shoot
        this.updateFrame();
        this.toShoot--;
        if(this.toShoot <= 0){
            this.toShoot = 60;

            // Aim
            if(game.Player) this.target = getDirection(this, game.Player);

            // Fire
            game.Projectiles.push(new EnemyShot(this.x, this.y, this.target));
        }
        this.y-=this.speed;
        if(this.y < -this.drawH) this.health = 0;

        // HULL DAMAGE
        for(const emitter of this.emitters){
            const emitX = this.x + emitter[0];
            const emitY = this.y + emitter[1];
            game.EFX.push(setEffectTrailBurn(emitX,emitY));
        }
    }
    static spawn(x = 300){

        return new MGPlane(x);
    }
}

class DynaMid extends MidPlane{
    // hitbox = 34 34 56 56
    // draw = 124 124
    constructor(x,y){
        super(x, 124, 124, [ [34, 34, 56, 56] ]);
        this.speed = 1;
        this.health = 10;
        // this.y???
        // this.dir???
        this.toShoot = 5000
        this.sprite = _VECT_MidDyna;
    }
    update(){
        
    }
}

class EnemyShot extends Actor {
    constructor(x,y,dir,speed){
        super(x,y,17,17,[ [2.5,2.5,12,12] ]);
        this.power = 36;
        this.dir = dir ? dir : 0;
        this.speed = speed ? speed : 2;
        this.sprite = _VECT_EnemyBullet;
    }
    update(game){
        move(this);
        
        // If OUT OF BOUNDS
        if(this.isOutOfBounds){
            this.health = 0;
        }
    }
}