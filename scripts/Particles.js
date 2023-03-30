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
    update(game){
        this.duration--;
        this.particles.forEach( particle => {
            particle.update(game)
        })
        this.particles = this.particles.filter(particle => !particle.clear);
    }
}

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

const setEffectTrailFS = (x,y) => {
    return new Emitter(x,y,-1, [new Spark(x, y - 5, getRandom(180, 0), 2, 20), new Fade(x,y,15,10,0)])
}

const setEffectTrailBurn = (x,y) => {
    return new Emitter(x,y,-1, [new Fade(x,y,20,6,3)])
}

/*=================
==== POWER UPS ====
=================*/

class Circle extends Particle{
    constructor(x,y,color){
        super(x,y,10,0,0,0);
        this.radius = 10;
        this.fill = color;
    }
    update(){
        this.decay--;
        this.radius += 3;
    }
    draw(){
        ctx.strokeStyle = this.fill;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 7);
        ctx.stroke();
    }
}

class PartPlayer extends Particle{
    constructor(x,y,color){
        super(x,y,15,0,0,2);
        this.scale = 1;
        this.stroke = color;
        this.dw = 90;
        this.dh = 60;
        this.alphaPalette = getAlphaPalette(color);
    }
    update(game){
        this.decay--;
        this.scale += 0.01;
        if(game.Player){
            this.x = game.Player.x;
            this.y = game.Player.y;
        }
        this.stroke = updateColor(this, this.alphaPalette);
    }
    draw(){
        ctx.strokeStyle = this.stroke;
        // set transform
        const x = this.x - (this.dw/2),
            y = this.y - (this.dh/2);

        ctx.translate(this.x,this.y);
        ctx.scale(this.scale,this.scale);
        ctx.translate(-this.x,-this.y);

        // Draw Shape
        ctx.translate(x,y);
        ctx.beginPath();
        ctx.stroke(new Path2D("M68.59,33.48l20.36-11.16v-6.26H68.59v-4.7l-4.01-1.74V5.77h-3.62v3.8l-4.11,1.78v4.7h-6.46V7.44L45,2.54l-5.38,4.89v8.61\t\th-6.46v-4.7l-4.11-1.78v-3.8h-3.62v3.84l-4.01,1.74v4.7H1.05v6.26l20.36,11.16l3.33,3.72v9.98h0l-5.48,7.24h6.17v3.03h3.62v-3.03\t\th31.91v3.03h3.62v-3.03h6.17l-5.48-7.24v-9.98L68.59,33.48z M60.27,47.18H29.73v-9.98l3.43-3.72h6.46h10.77h6.46l3.43,3.72V47.18z"))

        // reset transform
        ctx.resetTransform();
    }
}

class StaticSpark extends Particle{
    constructor(x,y,color,dir,speed,duration){
        super(x,y,duration,speed,dir);
        this.fill = color;
    }
    update(){
        this.decay--;
        this.updatePos();
    }
    draw(){
        ctx.fillStyle = this.fill;
        ctx.fillRect(this.x,this.y,3,3);
    }
}

const setEffectPowerUp = (x,y,color) => {
    const particles = [new PartPlayer(x,y,color)];
    for(let i = 0; i < 30; i ++){
        const   spd = getRandom(2, 5),
                dur = getRandom(15, 30);
        particles.push(new StaticSpark(getRandom(x-45,x+45),getRandom(y-30,y+30),color,270,spd,dur));
    }
    return new Emitter(x,y,-1,particles);
}

const mask = {"name":"mask",
    "shapes":[
        {
            "type":"path",
            "className":"default",
            "coords":"M68.59,33.48l20.36-11.16v-6.26H68.59v-4.7l-4.01-1.74V5.77h-3.62v3.8l-4.11,1.78v4.7h-6.46V7.44L45,2.54l-5.38,4.89v8.61\t\th-6.46v-4.7l-4.11-1.78v-3.8h-3.62v3.84l-4.01,1.74v4.7H1.05v6.26l20.36,11.16l3.33,3.72v9.98h0l-5.48,7.24h6.17v3.03h3.62v-3.03\t\th31.91v3.03h3.62v-3.03h6.17l-5.48-7.24v-9.98L68.59,33.48z M60.27,47.18H29.73v-9.98l3.43-3.72h6.46h10.77h6.46l3.43,3.72V47.18z"
        }
    ]
}