class Actor{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.health = 1;
        this.type = 'enemy';
    }
    get clear(){
        return this.health <= 0
    }
    get isOutOfBounds(){
        return (this.x < 0 || this.y < 0 || this.x > viewport.width || this.y > viewport.height)
    }
}

// Small Planes

class SmallPlane extends Actor{
    constructor(x,y){
        super(x,y);
        this.w = 32;
        this.h = 32;
        this.speed = 2;
    }
}

class SWPlane extends SmallPlane{
    constructor(x){
        super(x,0);
        this.y -= this.h;
        this.points = 9;
    }
    update(){
        this.y += this.speed;
        if(this.y > viewport.height) this.health = 0;
    }
    draw(){
        ctx.fillStyle = 'pink';
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
    static spawn(){
        const x = Math.floor(Math.random() * (560 - 40 + 1) + 40);
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
        super(x, spawnY);
        this.w = 50;
        this.h = 50;
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
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
    static spawn(x = 300){

        return new MGPlane(x);
    }
}

class EnemyShot extends Actor {
    constructor(x,y,dir,speed){
        super(x,y);
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

class Alarm{
    constructor(duration, func){
        this.duration = duration;
        this.action = func;
    }

    get clear(){
        return Math.floor(this.duration) <= 0;
    }

    update(time, game){
        this.duration -= time;
        if(this.clear){
            this.action(game);
        }
    }
}

class EnemyController extends Alarm{
    constructor(duration, interval, func){
        super(duration, func)
        this.intervalLength = interval;
        this.interval = new Alarm(this.intervalLength, func);
    }
    update(time, game){
        // Initialize OR Update Timer
        this.duration -= time;

        // Perform the specified action
        this.interval.update(time, game);
        if(this.interval.clear) this.interval = new Alarm(this.intervalLength, this.action);
    }
}

// Game -> Controller -> Enemy...  So the Game has 100% access to the Controller... Do we give Controllers access to the Game?  Of Course!  Controllers can reference the Game object through their update method, which accepts a binding to the Game object as a parameter...
// This would mean... that the ACTIONS we pass to the Enemy Controller, MUST accept ONE argument (THE GAME)
