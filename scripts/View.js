// So Maybe we'll have one big draw function that draws the game state
// And this will be broken down into individual drawing components...
// So every frame we'll need to make a snapshot of the game state...
// And then use our draw routine to draw that state so the player can see it...

// View will be a static class... viewport and ctx will be globally scoped variables.

const viewport = document.getElementById('viewport');
const ctx = viewport.getContext('2d');

class View{
    // Clears the screen prior to Drawing
    static clearView(){
        ctx.clearRect(0,0,viewport.width,viewport.height);
    }
    // The render function handles all of the Drawing
    static render(Game){
        const { Player, Projectiles, Background, Actors } = Game;

        // Clear View

        View.clearView();

        // Draw Background

        View.drawActor(Background);

        // Draw Deco

        // Draw Effects

        // Draw Player
        if(Player) View.drawActor(Player);

        // Draw Enemies

        Actors.forEach((actor) => View.drawActor(actor));

        // DEBUG
        document.getElementById('actors').innerHTML = JSON.stringify(Actors);
        document.getElementById('timer').innerHTML = JSON.stringify(Game.TimeMS);

        // Draw Projectiles ( pBullet, Rocket, eBullet )
        Projectiles.forEach((projectile)=> View.drawActor(projectile));

        // Draw GUI

    }
    // Draw Actor
    static drawActor(actor){
        const { scale, rotate } = actor;
        // set the transformation based on scale and rotate
        actor.draw();
        // reset the transformation
        ctx.resetTransform();
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