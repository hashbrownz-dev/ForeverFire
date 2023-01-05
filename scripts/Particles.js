class Particle{
    constructor(x, y, duration, speed, dir, scrollRate = 0){
        this.duration = duration;
        this.decay = this.duration;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.dir = dir;
        this.scrollRate = scrollRate;
        this.del = false;
    }
    get clear(){
        return this.decay === 0 || this.del;
    }
    updatePos(dir=0){
        // Update the direction of the particle.
        turnActor(this,dir)
        // Move the particle
        moveActor(this);
        // Move with background
        this.y += this.scrollRate;
    }
    // update -> Handles the heavy lifting... the update method moves a particle, and also updates it's rendering parameters as well.  THIS method is unique to each child of Particle
    // draw -> Handles the rendering...  We'll try to use absolute positioning when we can with particles...  They don't have a bounding box, per se, so it should be relatively easy...
}

class Emitter{
    constructor(x,y,duration,particles = []){
        this.x = x;
        this.y = y;
        this.duration = duration;
        this.del = false;
        this.particles = particles;
    }
    // Emitters will clear if their duration === 0 OR they have no more particles
    get clear(){
        return !this.duration || !this.particles.length || this.del;
    }
    update(time, game){
        this.duration--;
        this.particles.forEach( particle => {
            particle.update()
        })
        this.particles = this.particles.filter(particle => !particle.clear);
    }
}

// EXPLOSION PALETTE

const explosionPalette = [
    '#660000',  // Crimson
    '#cc3333',  // Scarlett
    '#ff9900',  // Orange
    '#ffcc00',  // Gold
    '#ffff33',  // Yellow
    '#ffff99',  // Naples Yellow
    '#ffffff'   // White
]

// UPDATE COLOR
const updateColor = (particle, palette) => {
    const interval = 1 / palette.length;
    return palette[ Math.floor((particle.decay / particle.duration) / interval) ]
}

// PARTICLE - SPARK
// 1px Square, Color is White, Move in a straight line, Random decay...

class Spark extends Particle{
    constructor(x,y,dir,speed,duration){
        super(x,y,duration,speed,dir);
        this.fill = 'white';
    }
    update(){
        this.decay--;
        this.updatePos();
        // UPDATE COLOR
        this.fill = updateColor(this, explosionPalette);
    }
    draw(){
        ctx.fillStyle = this.fill;
        ctx.fillRect(this.x,this.y,3,3);
    }
}

class Bloom extends Particle{
    constructor(x, y, duration, radius, innerDecay = false){
        super(x,y,duration,0,0,0);
        this.radius = radius;
        this.innerDecay = innerDecay;
    }
    update(){
        this.decay--;
        // INCREASE SIZE
        // size is the inverse... of decay / duration
        // decay / duration is a value between 1 and 0 that decreases over time... so we need a number that increases over time... that we can multiply by our base radius
        // (1 - (decay / duration)) * baseRadius = Current Size
        // As the OUTER circle gets bigger... the INNER Circle gets bigger too.
        // So for the INNER CIRCLE we it's size should be equal to the OUTER CIRCLE * (1 - (decay / duration))
        // UPDATE COLOR
        this.fill = updateColor(this, explosionPalette);
    }
    draw(){
        // Get Current Size
        const currentRadius = (1 - (this.decay / this.duration)) * this.radius;
        ctx.fillStyle = updateColor(this, explosionPalette);
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, 7);
        if(this.innerDecay){
            ctx.arc(this.x, this.y, currentRadius * (1 - (this.decay / this.duration)), 0, 7);
        }
        ctx.fill('evenodd');
    }
}

class Fade extends Particle {
    constructor(x,y, duration, radius, scrollRate){
        super(x,y,duration,0,0,scrollRate);
        this.radius = radius;
    }
    update(){
        this.decay--;
        this.y+=this.scrollRate;
    }
    draw(){
        const currentRadius = (this.decay / this.duration) * this.radius;
        ctx.fillStyle = updateColor(this, explosionPalette);
        ctx.beginPath();
        ctx.arc(this.x,this.y,currentRadius,0,7);
        ctx.fill();
    }
}

// EFFECT - BULLET IMPACT

const setEffectBulletImpact = (x,y) => {
    const amount = Math.floor(Math.random() * 6 + 5);
    const particles = [];
    for(let i = amount; i > 0; i--){
        const   dir = Math.floor(Math.random() * 61 + 60),
                spd = Math.floor(Math.random() * 3 + 2),
                dur = Math.floor(Math.random() * 16 + 15);
        particles.push(new Spark(x, y, dir, spd, dur));
    }
    return new Emitter(x,y,-1,particles)
}

// EFFECT - PARTICLE EXPLOSION

const setEffectPartExplosion = (x,y) => {
    const particles = [];
    for(let i = 0; i < 359; i+=10){
        const   spd = Math.floor(Math.random() * 3 + 2),
                dur = Math.floor(Math.random() * 16 + 30);
        particles.push(new Spark(x,y, i, spd, dur));
    }
    return new Emitter(x,y, -1, particles);
}

// EFFECT - CIRCLE EXPLOSION

const setEffectCircleExplosion = (x,y,radius) => {
    return new Emitter(x,y, -1, [new Bloom(x,y,15,radius,true)])
}

// EFFECT - TRAIL

const setEffectTrailKamikaze = (x,y) => {
    return new Emitter(x,y,-1, [new Fade(x,y,15,5,0)])
}

const setEffectTrailBurn = (x,y) => {
    return new Emitter(x,y,-1, [new Fade(x,y,20,6,3)])
}