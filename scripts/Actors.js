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
        renderSprite(frame, this.drawX, this.drawY, this.drawW, this.drawH, this.dir, this.mirrorX);
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
    constructor(x){
        super(x,0,54,56,[ [15,16,24,24] ]);
        this.y -= this.drawH;
        this.speed = 4;
        this.distance;
        this.xSpeed = 1.5;
        this.points = 9;
        this.sprite = _VECT_Kamikaze;
        this.mirrorX = false;
    }
    update(time, game){
        // Set our initial distance
        if (!this.distance) {
            if(game.Player){
                this.distance = Math.abs(this.x - game.Player.x);
            }
        }

        this.y += this.speed;
        if(this.drawY > viewport.height) this.health = 0;
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
    static spawn(){
        const x = Math.floor(Math.random() * (viewport.width - 50) + 50);
        return new Kamikaze(x);
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