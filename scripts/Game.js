class Game{
    constructor(){
        this.Score = 0;
        this.Timer;
        this.Lives = 0;
        this.Player = new Player();
        this.Actors = [];
        this.Projectiles = [];
        this.Controllers = [];
        this.EFX = [];
        this.Background = new Background();
        this.gameOver = false;
    }

    update(input, elapsed){
        // Update Timer
        this.updateTimer(elapsed);
        // Update Controllers
        this.updateControllers(elapsed);

        // Get User Input
        this.getInput(input);

        // Update Actors
        this.Actors.forEach( actor => actor.update(elapsed, this) );

        // Update Projectiles
        this.Projectiles.forEach( projectile => projectile.update(elapsed, this));

        // Check for Collisions
        this.checkForCollisions();

        // Check Player Status
        if(this.Player && this.Player.clear){
            this.Player = undefined;
            this.Lives--;
            // IF Lives >= 0, Respawn the Player
            if(this.Lives >= 0){
                // Set player Respawn Timer
                const respawnPlayer = (game) => {
                    game.Player = new Player();
                }
                this.Controllers.push(new Alarm(3000, respawnPlayer))
            } else { // Otherwise, Set GAMEOVER Timer
                const setGameOver = (game) => {
                    game.gameOver = true;
                }
                this.Controllers.push(new Alarm(3000, setGameOver));
            }
            
        }

        // Filter ACTORS & PROJECTILES
        this.filterActors();
    }

    updateControllers(time){
        this.Controllers.forEach( controller => controller.update(time, this));
        this.Controllers = this.Controllers.filter( controller => !controller.clear);
        // TEST CODE
        if(this.Controllers.length === 0){
            const spawnPlane = (g) => {
                g.Actors.push(MGPlane.spawn());
            }
            this.Controllers.push(new EnemyController(10000,5000, spawnPlane))
        }
    }

    getInput(input){
        if(this.Player){
            // Player.update() will return true if the player is firing
            let isFiring = this.Player.update(input);
            if(isFiring){
                const {x, y} = this.Player;
                this.Projectiles.push(new PlayerShot(x,y));
            }
        }
    }

    filterActors(){
        this.Actors = this.Actors.filter( actor => !actor.clear);
        this.Projectiles = this.Projectiles.filter( proj => !proj.clear);
    }

    updateScore(points){
        this.Score+=points;
    }

    updateTimer(time){
        !this.Timer ? this.Timer=time : this.Timer += time;
    }

    get TimeMS(){
        return (Math.floor(this.Timer));
    }
    
    get Time(){
        return (Math.floor(this.Timer / 1000))
    }
    checkForCollisions(){
        // ACTOR x PROJECTILE
        for(const actor of this.Actors){
            if(actor.type === 'enemy'){
                for(const proj of this.Projectiles){
                    if(proj.type === 'player' && (overlap(actor,proj) || overlap(proj,actor))){
                        // Apply Damage
                        actor.health -= proj.power;

                        // Remove Projectile
                        proj.clear = true;

                        // Update Score
                        this.updateScore(1);
                        if(actor.clear) this.updateScore(actor.points);
                    }
                }
            }
        }

        // PLAYER x PROJECTILE
        if(this.Player){
            for(const proj of this.Projectiles){
                if(proj.type === 'enemy' && !proj.clear){
                    if(overlap(this.Player,proj) || overlap(proj,this.Player)){
                        // Apply Damage
                        this.Player -= proj.power;

                        // Remove Projectile
                        proj.clear = true;
                    }
                }
            }
        }

        // ACTOR x PLAYER
        if(this.Player){
            for(const actor of this.Actors){
                if(actor.type === 'enemy' && !actor.clear){
                    if(overlap(this.Player, actor) || overlap(actor, this.Player)){
                        // Apply Damage
                        this.Player.health -= 100;
                        actor.health -= 100;
                    }
                }
            }
        }
    }
}

// COLLISION DETECTION

const overlapX = (actor1, actor2) => {
    return (( actor1.x > actor2.x && actor1.x < actor2.x + actor2.w ) || ( actor1.x + actor1.w > actor2.x && actor1.x + actor1.w < actor2.x + actor2.w))
}

const overlapY = (actor1, actor2) => {
    return (( actor1.y > actor2.y && actor1.y < actor2.y + actor2.h) || ( actor1.y + actor1.w > actor2.y && actor1.y + actor1.h < actor2.y + actor2.h))
}

const overlap = (actor1, actor2) => {
    return (overlapX(actor1, actor2) && overlapY(actor1, actor2));
}

// ALARMS

// I figure, the alarm class can help with things like iframes, and respawns and shit like that...  basically... an alarm is a simple actor, it just has a single value, duration (ms), which decrements with each screen update...  and that's it... when it's value hits 0 it does whatever it needs to do...

