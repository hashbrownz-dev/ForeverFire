const viewport = document.getElementById('viewport');
const ctx = viewport.getContext('2d');
ctx.imageSmoothingEnabled = false;
ctx.lineWidth = 1.5;

const defaultStyle = {
    fill:'#000000',
    stroke:'none'
}

class View{
    // Clears the screen prior to Drawing
    static clear(){
        ctx.clearRect(0,0,viewport.width,viewport.height);
    }
    // The render function handles all of the Drawing
    static render(Game, userInput){
        const { Player, Projectiles, Background, Actors, Score, Lives, EFX, DBR } = Game;

        // Clear View

        View.clear();

        // Draw Background

        View.drawActor(Background);

        // Draw Player
        
        if(Player) {
            View.drawActor(Player)
            if(DBR) View.drawHitBoxes(Player);
        };

        // Draw Projectiles ( pBullet, Rocket, eBullet )
        Projectiles.forEach((projectile)=> {
            View.drawActor(projectile);
        });

        // Draw Actors

        Actors.forEach((actor) => {
            View.drawActor(actor);
            if(DBR) View.drawHitBoxes(actor);
        });

        // Draw Effects

        EFX.forEach( emitter => {
            emitter.particles.forEach( particle => particle.draw())
        })

        // Draw GUI

        // Draw High Score

        // Draw Score

        document.getElementById('score').innerHTML = `SCORE: ${Score}`

        // Draw Health

        let pHealth = Player ? Player.health : 0;
        document.getElementById('health').innerHTML = `HP: ${pHealth} / 100`

        // Draw Lives

        document.getElementById('lives').innerHTML = `LIVES: ${Lives}`

        // DEBUG
        // drawDebug(Game, userInput);
    }

    // Draw Actor

    static drawActor(actor){
        actor.draw();
        ctx.resetTransform();
    }

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

// renderSprite(frame, this.drawX, this.drawY, this.drawW, this.drawH, this.dir, this.mirrorX, this.mirrorY)

const renderSprite = (sprite, x, y, options = {}) => {
    const { layers, hitboxes } = sprite;
    const { drawW:w, drawH:h } = sprite.dimensions;
    const { xScale, yScale, dir, mirrorX, mirrorY } = options;
    const anchor = {
        x: x + (w/2),
        y: y + (h/2)
    }

    // SCALE
    if(xScale){
        scaleX(x,y,xScale);
    }
    if(yScale){
        scaleY(x,y,yScale);
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

    // OVERRIDE STYLES
    // Create a copy of sprite.styles
    const styles = JSON.parse(JSON.stringify(sprite.styles));

    if(options.styles){
        options.styles.forEach( style => {
            if(style.method.toLowerCase() === 'stroke'){
                getStyleByStroke(styles, style.defaultColor).stroke = style.newColor;
            }
            if(style.method.toLowerCase() === 'fill'){
                getStyleByFill(styles, style.defaultColor).fill = style.newColor;
            }
        })
    }

    for( const layer of layers){
        const { shapes } = layer;
        for( const shape of shapes){
            const path = drawShape(shape);
            const style = getStyle(styles, shape.className);
            renderShape(style, path);
        }
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

const getStyleByFill = (styles, fill) => {
    const style = styles.find( e => e.fill.toUpperCase() === fill.toUpperCase());
    return style;
}

const getStyleByStroke = (styles, stroke) => {
    const style = styles.find( e => e.stroke.toUpperCase() === stroke.toUpperCase());
    return style;
}

const getDefaultStyles = (styles) => {
    // styles is an array... so we'll sort through that and create the objects we need
    // Actor.defaultStyles = [ { method, defaultColor }]
    const defaultStyles = [];
    for(const style of styles){
        let method, defaultColor;
        if(style.fill !== 'none'){
            method = 'stroke';
            defaultColor = style.stroke;
        } else {
            method = 'fill';
            defaultColor = style.fill;
        }
        defaultStyles.push({
            method,
            defaultColor
        })
    }
}

const renderShape = (style, path) => {
    // if style is undefined... we'll render our shape with a black fill
    if(!style){
        if(defaultStyle.fill !== 'none'){
            ctx.fillStyle = defaultStyle.fill;
            ctx.fill(path);
        }
        if(defaultStyle.stroke !== 'none'){
            ctx.strokeStyle = defaultStyle.stroke;
            ctx.stroke(path);
        }
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

const scaleX = (x, y, scale) => {
    ctx.translate(x,y);
    ctx.scale(scale,1);
    ctx.translate(-x,-y);
}

const scaleY = (x, y, scale) => {
    ctx.translate(x,y);
    ctx.scale(1,scale);
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