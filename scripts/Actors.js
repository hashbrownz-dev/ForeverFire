class Actor{
    constructor(x,y,dw,dh,hitBoxes){
        this.x = x;
        this.y = y;
        // the Actor constructor should now look like (x,y,dw,dh,[hBox])
        // hBox HAS to be an array that contains the objects i posted below...
        // To add multiple hitboxes, we'll have to cut the w and h from the constructor...
        // we'll have to add an array there...
        // and the array will have little bounding rects
        /* [
            [x,y,w,h],
            [x,y,w,h]
        ]
        */
        // once we have the hitboxes... then bounding rect will probably be deprecated...
        // we'll need a new... method called getHitBox(i) which will work similarly...
        // the actor class will have a frame property
        // and it should have an update frame method as well...
        // as MOST actors will loop through their sprite
        // Finally, we'll need to update the View class, so it draws hitboxes instead of boundingRects
        // And we'll need to update our collision checking method in the game class, and make sure we are looping through arrays...
        // A hitboxes x and y are relative to it's drawX(0) and drawY(0).
        // So the value will range between 0 and drawW || drawH
        // to get the absolute x and y of a hitbox, we use this formula:
        // absoluteX = hbX + drawX || absoluteY = hbY + drawY
        this.drawW = dw;
        this.drawH = dh;
        this.hitBoxes = hitBoxes;
        // this.w = w;
        // this.h = h;

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
        renderSprite(frame, this.drawX, this.drawY, this.dir);
    }
}

// Small Planes

class SmallPlane extends Actor{
    constructor(x,y,dw,dh,hitBoxes){
        super(x,y,dw,dh,hitBoxes);
        this.speed = 2;
    }
}

class Kamikaze extends SmallPlane{
    constructor(x){
        super(x,0,54,56,[ [15,16,24,24] ]);
        this.y -= this.drawH;
        this.points = 9;
        this.sprite = _VECT_Kamikaze;
    }
    update(){
        this.y += this.speed;
        if(this.drawY > viewport.height) this.health = 0;
    }
    static spawn(){
        const x = Math.floor(Math.random() * (viewport.width - 50) + 50);
        return new Kamikaze(x);
    }
}

// class SWPlane extends SmallPlane{
//     constructor(x){
//         super(x,0,32,32);
//         this.y -= this.h;
//         this.points = 9;
//     }
//     update(){
//         this.y += this.speed;
//         if(this.y > viewport.height) this.health = 0;
//     }
//     draw(){
//         ctx.fillStyle = 'pink';
//         ctx.fillRect(this.drawX,this.drawY,this.w,this.h);
//     }
//     static spawn(){
//         const x = Math.floor(Math.random() * (viewport.width - 40 + 1) + 40);
//         return new SWPlane(x);
//     }
// }

// Medium Plane

class MidPlane extends Actor{
    constructor(x){
        const spawnY = viewport.height + 8;
        super(x, spawnY, 50, 50, 112, 92);
        this.speed = 1;
        this.health = 10;
    }
}

class MGPlane extends MidPlane{
    constructor(x){
        super(x);
        this.speed = 1;
        this.y = viewport.height + 8;
        this.points = 50;
        this.toShoot = 1000;
        this.target = 270;
        this.sprite = _VECT_MidPlane;
    }
    update(time, game){
        // Check if it can shoot
        this.toShoot -= time;
        if(this.toShoot <= 0){
            this.toShoot = 1000;

            // Aim
            if(game.Player) this.target = getDirection(this, game.Player);

            // Fire
            game.Projectiles.push(new EnemyShot(this.x, this.y, this.target));
        }
        this.y-=this.speed;
        if(this.y < -this.h) this.health = 0;
    }
    draw(){
        this.frame++;
        if(this.frame >= this.sprite.length){
            this.frame = 0;
        }
        const frame = this.sprite[this.frame];
        renderSprite(frame, this.drawX, this.drawY);
    }
    static spawn(x = 300){

        return new MGPlane(x);
    }
}

class EnemyShot extends Actor {
    constructor(x,y,dir,speed){
        super(x,y,8,8,8,8);
        this.power = 50;
        this.dir = dir ? dir : 0;
        this.speed = speed ? speed : 2;
    }
    update(time, game){
        move(this);
        
        // If OUT OF BOUNDS
        if(this.isOutOfBounds){
            this.health = 0;
        }
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, 7);
        ctx.fill();
    }
}