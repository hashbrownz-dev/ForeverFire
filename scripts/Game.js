class Game{
    constructor(){
        this.Score = 0;
        this.Timer;
        this.Lives = 3;
        this.Player = new Player();
        this.Actors = [];
        this.Projectiles = [];
        this.Controllers = [];
        this.EFX = [];
        this.Background = new Background();
    }

    update(input, elapsed){
        // Update Timer
        this.updateTimer(elapsed);
        // Update Controllers
        this.updateControllers(elapsed);

        // Get User Input
        this.getInput(input);

        // Update Actors
        this.updateActors();

        // Update Projectiles
        this.updateProjectiles();

        // Check for Collisions
        this.checkForCollisions();

        // Check Player Status
        if(this.Player && this.Player.clear){
            this.Player = undefined;
            this.Lives--;
            // Set player Respawn Timer
            const respawnPlayer = (game) => {
                game.Player = new Player();
            }
            this.Controllers.push(new Alarm(3000, respawnPlayer))
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
                g.Actors.push(SWPlane.spawn());
            }
            this.Controllers.push(new EnemyController(10000,1000, spawnPlane))
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

    updateActors(){
        this.Actors.forEach( actor => actor.update() );
    }

    filterActors(){
        // Check for ACTOR x PLAYER Collisions
        // Check for PROJECTILE X PLAYER Collisions
        // Check for PROJECTILE X ACTOR Collisions
        this.Actors = this.Actors.filter( actor => !actor.clear);
        this.Projectiles = this.Projectiles.filter( proj => !proj.clear);
    }

    updateProjectiles(){
        this.Projectiles.forEach( (projectile) => projectile.update());
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

