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
        return (this.x < 0 || this.y < 0 || this.x > viewport.width || this.y > viewport.height)
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
    update(time, game){
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
    update(time, game){
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

// The Ace has the most complex flight pattern.
// The Ace's position is updated using the move() function, as the Ace's dir property will be updated constantly.
// The Ace will also have a series of methods that effect it's direction...
// turn() which takes a single argument (degree) and will adjust it's direction by that amount...  so if dir is 90 and we call turn 15 dir will be 105...
// an Ace's flight patter is also made up of keyFrames.
// each keyframe will consist of an integer and an action kind of like how Alarms work.
// the Ace will have a timer property, and everytime this property reaches zero, it will go to the next keyFrame in the array.  the keyFrame, determines what action to perform every update and the timer will be set to the duration.
// the Ace constructor will take in a x, y, and keyFrames parameters.  x and y are integers, and keyFrames is an array of objects...?
// Turning is just the process of going from one direction to the next... duh...  so in this context, when we are executing a turn, based on our keyframe architecture, we'll have a duration for the turn in frames, and ideally a target direction.  so the formula for calculating the delta each update is (targetDir - startDir) / intervals.  if our start direction is 0 (right) and our target direction is 180 (left) and we want to complete this turn in 60 frames: (180 - 0) / 60 = 3.  Every update we increase our dir by 3 frames. 
// the turns will be 30, 60, 90, 120, 150, 180
// how do we make key frames?
// so... as i said before... a keyframe has a duration and an action.  the action has to take place every update until the next keyframe is reached... so when we set a keyframe... and let's say we want to turn 180 in 60 frames... we'll call our keyframe setting function... with the amount of the turn '180', and the length of the turn '60 frames'  straight lines will be called with 0, and the length of the straight away...
// then our function... will take the turn and divide it by the amount of frames... and return an action that looks like this:
// return function(ace) ace.dir +=

class Ace extends SmallPlane{
    constructor(x,y,keyFrames){
        super(x, y, 56, 56, [ [7,7,42,42] ]);
        this.speed = 4;
        this.points = 19;
        this.currentKeyFrame = 0;
        this.keyFrames = keyFrames;
        this.timer = this.keyFrames[this.currentKeyFrame].duration;
        this.action = this.keyFrames[this.currentKeyFrame].action;
    }
    update(time, game){
        // Update Time
        this.timer --;
        if(this.timer === 0){
            this.currentKeyFrame++;
            // Once all keyFrames have been executed
            if(this.currentKeyFrame >= this.keyFrames.length){
                this.timer = -1;
                // perform the last action indefinitely
            }
            const { duration, action } = this.keyFrames[this.currentKeyFrame];
            // Reset timer
            this.timer = duration;
            this.action = action;
        }
        // Perform Action
        this.action(this);
        // action is a function that performs side effects on this
        // function(this){ this.x = 1; this.y = 20 }
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
        this.y = viewport.height + 8;
        this.points = 50;
        this.toShoot = 1000;
        this.target = 270;
        this.sprite = _VECT_MidPlane;
    }
    update(time, game){
        // Check if it can shoot
        this.updateFrame();
        this.toShoot -= time;
        if(this.toShoot <= 0){
            this.toShoot = 3000;

            // Aim
            if(game.Player) this.target = getDirection(this, game.Player);

            // Fire
            game.Projectiles.push(new EnemyShot(this.x, this.y, this.target));
        }
        this.y-=this.speed;
        if(this.y < -this.drawH) this.health = 0;
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
    update(time, game){
        move(this);
        
        // If OUT OF BOUNDS
        if(this.isOutOfBounds){
            this.health = 0;
        }
    }
}