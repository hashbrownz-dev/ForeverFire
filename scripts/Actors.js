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

// Plane
// each plane should have an x and y... a clear bool... a w and an h...
// each size class will have the same w and h...

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
