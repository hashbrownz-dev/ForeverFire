class Actor{
    constructor(x,y,w,h,dw,dh){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.drawW = dw;
        this.drawH = dh;
        this.health = 1;
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
}

// Small Planes

class SmallPlane extends Actor{
    constructor(x,y,dw,dh){
        super(x,y,32,32,dw,dh);
        this.speed = 2;
    }
}

class SWPlane extends SmallPlane{
    constructor(x){
        super(x,0,32,32);
        this.y -= this.h;
        this.points = 9;
    }
    update(){
        this.y += this.speed;
        if(this.y > viewport.height) this.health = 0;
    }
    draw(){
        ctx.fillStyle = 'pink';
        ctx.fillRect(this.drawX,this.drawY,this.w,this.h);
    }
    static spawn(){
        const x = Math.floor(Math.random() * (viewport.width - 40 + 1) + 40);
        return new SWPlane(x);
    }
}

// Small White Plane - moves vertically... slightly arching towards the player

// Small Green Plane


// Small Red Plane

// Medium Plane

class MidPlane extends Actor{
    constructor(x){
        const spawnY = viewport.height + 8;
        super(x, spawnY, 50, 50, 50, 50);
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
        ctx.fillStyle = 'pink';
        ctx.fillRect(this.drawX,this.drawY,this.w,this.h);
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