// So Maybe we'll have one big draw function that draws the game state
// And this will be broken down into individual drawing components...
// So every frame we'll need to make a snapshot of the game state...
// And then use our draw routine to draw that state so the player can see it...

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
            if(DBR) View.drawBoundingRect(Player);
        };

        // Draw Enemies

        Actors.forEach((actor) => {
            View.drawActor(actor);
            if(DBR) View.drawBoundingRect(actor);
        });

        // Draw Projectiles ( pBullet, Rocket, eBullet )
        Projectiles.forEach((projectile)=> {
            View.drawActor(projectile);
            if(DBR) View.drawBoundingRect(projectile);
        });

        // Draw GUI

        // Draw High Score

        // Draw Score

        document.getElementById('score').innerHTML = `SCORE: ${Score}`

        // Draw Lives

        document.getElementById('lives').innerHTML = `LIVES: ${Lives}`

        // DEBUG
        drawDebug(Game, userInput);
    }
    // Draw Actor
    static drawActor(actor){
        const { scale, rotate } = actor;
        // set the transformation based on scale and rotate
        actor.draw();
        // reset the transformation
        ctx.resetTransform();
    }
    static drawBoundingRect(actor){
        const {x,y,w,h} = actor.boundingRect;
        ctx.strokeStyle = '#33ff00';
        ctx.strokeRect(x,y,w,h);
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

const renderSprite = (sprite, x, y) => {
    const { classes, shapes } = sprite;
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
        ctx.lineTo(points[i].x, points[i].y);
    }
    return
}

const drawPolygon = (poly) => {
    drawPolyline(poly);
    ctx.closePath();
    return
}

const drawDebug = (game, userInput)=>{
    const { Actors, Controllers, Time, Projectiles, Player, Score } = game;
    document.getElementById('keylog').innerHTML = JSON.stringify(userInput)
    document.getElementById('actors').innerHTML = JSON.stringify(Actors)
    document.getElementById('controllers').innerHTML = JSON.stringify(Controllers);
    document.getElementById('timer').innerHTML = JSON.stringify(Time);
    document.getElementById('proj').innerHTML = JSON.stringify(Projectiles);
    document.getElementById('player').innerHTML = JSON.stringify(Player);
    document.getElementById('player').innerHTML = JSON.stringify(Score);
}

const testSprite = {
    "name":"Player-02",
    "classes":[
        {"className":"st0","display":"none"},
        {"className":"st1","fill":"none","stroke":"#000000","stroke-miterlimit":"10"},
        {"className":"st2","fill":"none","stroke":"#FFFFFF","stroke-miterlimit":"10"},
        {"className":"st3","fill":"#ED2024"},
        {"className":"st4","fill":"#FFFFFF"},
        {"className":"st5","fill":"#34C6F4"},
        {"className":"st6","fill":"#FFFFFF","stroke":"#FFFFFF","stroke-miterlimit":"10"}
    ],
    "shapes":[
        {"type":"path","className":"default","coords":"M68.59,33.48l20.36-11.16v-6.26H68.59v-4.7l-4.01-1.74V5.77h-3.62v3.8l-4.11,1.78v4.7h-6.46V7.44L45,2.54l-5.38,4.89v8.61h-6.46v-4.7l-4.11-1.78v-3.8h-3.62v3.84l-4.01,1.74v4.7H1.05v6.26l20.36,11.16l3.33,3.72v9.98h0l-5.48,7.24h6.17v3.03h3.62v-3.03h31.91v3.03h3.62v-3.03h6.17l-5.48-7.24v-9.98L68.59,33.48z M60.27,47.18H29.73v-9.98l3.43-3.72h6.46h10.77h6.46l3.43,3.72V47.18z"},
        {"type":"line","className":"st2","x1":"24.67","y1":"16.05","x2":"24.67","y2":"33.48"},
        {"type":"line","className":"st2","x1":"29.89","y1":"16.05","x2":"29.89","y2":"33.08"},
        {"type":"polygon","className":"st5","points":[{"x":"47.22","y":"21.84"},{"x":"42.78","y":"21.84"},{"x":"42.78","y":"13.33"},{"x":"45","y":"10.26"},{"x":"47.22","y":"13.33"},{"x":"\t\t"}]},
        {"type":"line","className":"st2","x1":"33.16","y1":"26.82","x2":"39.62","y2":"26.82"},
        {"type":"line","className":"st2","x1":"65.33","y1":"16.05","x2":"65.33","y2":"33.48"},
        {"type":"line","className":"st2","x1":"60.11","y1":"16.05","x2":"60.11","y2":"33.08"},
        {"type":"line","className":"st2","x1":"56.84","y1":"26.82","x2":"50.38","y2":"26.82"},
        {"type":"rect","className":"st4","x":"17.3","y":"6.29","w":"8.22","h":"2"},
        {"type":"rect","className":"st4","x":"52.73","y":"6.29","w":"8.22","h":"2"},
        {"type":"polygon","className":"st2","points":[{"x":"50.38","y":"33.48"},{"x":"39.62","y":"33.48"},{"x":"39.62","y":"7.44"},{"x":"45","y":"2.54"},{"x":"50.38","y":"7.44"},{"x":"\t\t"}]},
        {"type":"polygon","className":"st2","points":[{"x":"65.26","y":"47.18"},{"x":"24.74","y":"47.18"},{"x":"19.26","y":"54.42"},{"x":"70.74","y":"54.42"},{"x":"\t\t"}]},
        {"type":"polygon","className":"st2","points":[{"x":"33.16","y":"33.48"},{"x":"21.41","y":"33.48"},{"x":"21.41","y":"11.35"},{"x":"27.28","y":"8.81"},{"x":"33.16","y":"11.35"},{"x":"\t\t"}]},
        {"type":"polyline","className":"st2","points":[{"x":"39.62","y":"16.05"},{"x":"1.05","y":"16.05"},{"x":"1.05","y":"22.32"},{"x":"21.41","y":"33.48"},{"x":"39.62","y":"33.48"},{"x":"\t\t"}]},
        {"type":"polyline","className":"st2","points":[{"x":"33.16","y":"33.48"},{"x":"29.73","y":"37.19"},{"x":"24.74","y":"37.19"},{"x":"21.41","y":"33.48"},{"x":"\t\t"}]},
        {"type":"rect","className":"st2","x":"24.74","y":"37.19","w":"4.99","h":"9.98"},
        {"type":"rect","className":"st2","x":"25.42","y":"54.42","w":"3.62","h":"3.03"},
        {"type":"polygon","className":"st2","points":[{"x":"56.84","y":"33.48"},{"x":"68.59","y":"33.48"},{"x":"68.59","y":"11.35"},{"x":"62.72","y":"8.81"},{"x":"56.84","y":"11.35"},{"x":"\t\t"}]},
        {"type":"polyline","className":"st2","points":[{"x":"50.38","y":"16.05"},{"x":"88.95","y":"16.05"},{"x":"88.95","y":"22.32"},{"x":"68.59","y":"33.48"},{"x":"50.38","y":"33.48"},{"x":"\t\t"}]},
        {"type":"polyline","className":"st2","points":[{"x":"56.84","y":"33.48"},{"x":"60.27","y":"37.19"},{"x":"65.26","y":"37.19"},{"x":"68.59","y":"33.48"},{"x":"\t\t"}]},
        {"type":"rect","className":"st2","x":"60.27","y":"37.19","w":"4.99","h":"9.98"},
        {"type":"rect","className":"st2","x":"60.96","y":"54.42","w":"3.62","h":"3.03"},
        {"type":"rect","className":"st2","x":"25.42","y":"5.77","w":"3.62","h":"3.03"},
        {"type":"rect","className":"st2","x":"60.96","y":"5.77","w":"3.62","h":"3.03"}
    ]
}