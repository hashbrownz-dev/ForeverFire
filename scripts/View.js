
// View will be a static class... viewport and ctx will be globally scoped variables.

const viewport = document.getElementById('viewport');
const ctx = viewport.getContext('2d');
ctx.imageSmoothingEnabled = false;
ctx.lineWidth = 1.5;

class View{
    // Clears the screen prior to Drawing
    static clearView(){
        ctx.clearRect(0,0,viewport.width,viewport.height);
    }
    // The render function handles all of the Drawing
    static render(Game, userInput){
        const { Player, Projectiles, Background, Actors, Score, Lives, DBR } = Game;

        // Clear View

        View.clearView();

        // Draw Background

        View.drawActor(Background);

        // Draw Effects

        // Draw Player
        
        if(Player) {
            View.drawActor(Player)
            if(DBR) View.drawHitBoxes(Player);
        };

        // Draw Projectiles ( pBullet, Rocket, eBullet )
        Projectiles.forEach((projectile)=> {
            View.drawActor(projectile);
            // if(DBR) View.drawBoundingRect(projectile);
        });

        // Draw Enemies

        Actors.forEach((actor) => {
            View.drawActor(actor);
            if(DBR) View.drawHitBoxes(actor);
        });

        

        // Draw GUI

        // Draw High Score

        // Draw Score

        document.getElementById('score').innerHTML = `SCORE: ${Score}`

        // Draw Lives

        document.getElementById('lives').innerHTML = `LIVES: ${Lives}`

        // DEBUG
        // drawDebug(Game, userInput);
    }
    // Draw Actor
    static drawActor(actor){
        const { scale, rotate } = actor;
        // set the transformation based on scale and rotate
        actor.draw();
        // reset the transformation
        ctx.resetTransform();
    }
    // static drawBoundingRect(actor){
    //     const {x,y,w,h} = actor.boundingRect;
    //     ctx.strokeStyle = '#33ff00';
    //     ctx.strokeRect(x,y,w,h);
    // }
    static drawHitBoxes(actor){
        for(let i = 0; i < actor.hitBoxes.length; i++){
            const {x,y,w,h} = actor.getHitBox(i);
            ctx.strokeStyle = '#33ff00';
            ctx.strokeRect(x,y,w,h);
        }
    }
}

class Background{
    constructor(vSpacing = 80, scrollRate = 1){
        this.vSpacing = vSpacing;
        this.scrollRate = scrollRate;
        this.bars = [];
        const viewport = document.getElementById('viewport');
        for(let i = 0; i <= viewport.height; i+= vSpacing ){
            this.bars.push({ x:viewport.width + 8, y:i })
        }
    }
    update(){
        const yLimit = document.getElementById('viewport').height + this.vSpacing;
        this.bars = this.bars.map( bar => { 
            let { x, y } = bar;
            y += this.scrollRate;
            if(y > yLimit){
                // y equals the difference between... the current y and yLimit
                y = yLimit - y;
            }
            return { x, y }
        })
    }
    draw(){
        this.update();
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,viewport.width,viewport.height);
        ctx.strokeStyle = 'lime';
        this.bars.forEach( bar => {
            ctx.beginPath();
            ctx.moveTo(bar.x, bar.y);
            ctx.lineTo(-8, bar.y);
            ctx.stroke();
        })
    }
}

const renderSprite = (sprite, x, y, w, h, dir, mirrorX, mirrorY) => {
    const { classes, shapes } = sprite;
    const anchor = {
        x: x + (w/2),
        y: y + (h/2)
    }
    // MIRROR
    if(mirrorX){
        flipX(anchor.x);
    }
    if(mirrorY){
        flipY(anchor.y);
    }
    // ROTATE
    if(dir){
        // ROTATE THIS BITCH
        rotate(anchor, dir);
    }
    // TRANSLATE
    ctx.translate(x,y);

    for( const shape of shapes){
        // draw our shape (path)
        const path = drawShape(shape);
        // render our shape
        const style = getStyle(classes, shape.className);
        renderShape(style, path);
    }
    ctx.resetTransform();
}

const drawShape = (shape) => {
    switch(shape.type){
        case 'path':
            return drawPath(shape);
        case 'line':
            return drawLine(shape);
        case 'polyline':
            return drawPolyline(shape);
        case 'polygon':
            return drawPolygon(shape);
        case 'rect':
            return drawRect(shape);
        case 'circle':
            return drawCirc(shape);
    }
}

const getStyle = (stylelist, name) => {
    // This will either return the appropriate element from "classes" or it will return 'default'...
    const style = stylelist.find( e => e.className === name);
    return style;
}

const renderShape = (style, path) => {
    // if style is undefined... we'll render our shape with a black fill
    if(!style){
        ctx.fillStyle = '#000000';
        ctx.fill(path);
        return;
    }
    // every style has a fill...
    if(style.fill !== "none"){
        ctx.fillStyle = style.fill;
        ctx.fill(path);
    }
    // only SOME have a stroke...
    if(style.hasOwnProperty('stroke')){
        ctx.strokeStyle = style.stroke;
        path ? ctx.stroke(path) : ctx.stroke();
    }
}

const drawPath = (path) => {
    ctx.beginPath();
    return new Path2D(path.coords);
}

const drawRect = (rect) => {
    ctx.beginPath();
    const { x, y, w, h } = rect;
    return ctx.rect(x,y,w,h)
}

const drawLine = (line) => {
    ctx.beginPath();
    const { x1, y1, x2, y2 } = line;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    return;
}

const drawPolyline = (poly) => {
    const { points } = poly;
    const { x:startX, y:startY } = points[0];
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    for(let i = 1; i < points.length; i++){
        if(points[i].hasOwnProperty('y')){
            ctx.lineTo(points[i].x, points[i].y);
        }
    }
    return
}

const drawPolygon = (poly) => {
    drawPolyline(poly);
    ctx.closePath();
    return
}

const drawCirc = (circ) => {
    ctx.beginPath();
    ctx.arc(circ.x, circ.y, circ.r, 0,7);
}

const flipX = (anchor) =>{
    ctx.translate(anchor,0);
    ctx.scale(-1,1);
    ctx.translate(-anchor,0);
}

const flipY = (anchor) => {
    ctx.translate(0,anchor);
    ctx.scale(1,-1);
    ctx.translate(0,-anchor)
}

const rotate = (anchor, angle) => {
    const { x, y } = anchor;
    ctx.translate(x,y);
    ctx.rotate(degToRad(angle));
    ctx.translate(-x,-y);
}

// a func to convert degrees to radians

const degToRad = (deg) => Math.PI / 180 * deg;

// a func to convert radians to degrees

const radToDeg = (rad) => 180 / Math.PI * rad;

// const drawDebug = (game, userInput)=>{
//     const { Actors, Controllers, Time, Projectiles, Player, Score } = game;
//     document.getElementById('keylog').innerHTML = JSON.stringify(userInput)
//     document.getElementById('actors').innerHTML = JSON.stringify(Actors)
//     document.getElementById('controllers').innerHTML = JSON.stringify(Controllers);
//     document.getElementById('timer').innerHTML = JSON.stringify(Time);
//     document.getElementById('proj').innerHTML = JSON.stringify(Projectiles);
//     document.getElementById('player').innerHTML = JSON.stringify(Player);
//     document.getElementById('player').innerHTML = JSON.stringify(Score);
// }