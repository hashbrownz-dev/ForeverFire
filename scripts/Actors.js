class Actor{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.type = 'enemy';
        this.clear = false;
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
    constructor(x,y){
        super(x,y);
    }
    update(){
        this.y += this.speed;
        if(this.y > viewport.height) this.clear = true;
    }
    draw(){
        ctx.fillStyle = 'pink';
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
}

// Small White Plane - moves vertically... slightly arching towards the player

// Small Green Plane


// Small Red Plane

// Plane
// each plane should have an x and y... a clear bool... a w and an h...
// each size class will have the same w and h...

class EnemyController {
    constructor(duration, interval, func){
        this.duration = duration;
        this.interval = interval;
        this.action = func;
        this.durationTimer;
        this.intervalTimer;
        this.clear = false;
    }
    update(time){
        // Initialize OR Update Timer
        !this.durationTimer ? this.durationTimer=time : this.durationTimer += time;

        // Perform the specified action
        !this.intervalTimer ? this.intervalTimer=time : this.intervalTimer += time;
        if(this.intervalTimer >= this.interval){
            this.action();
            this.intervalTimer = this.intervalTimer - this.interval;
        }
        // Check the duration
        if(Math.floor(this.durationTimer) >= this.duration) this.clear = true;
    }
}
