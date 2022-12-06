class Game{
    constructor(){
        this.Score = 0;
        this.Timer;
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
    }

    updateControllers(time){
        this.Controllers.forEach( controller => controller.update(time));
        this.Controllers = this.Controllers.filter( controller => !controller.clear);
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
        // Update Each Actor
        this.Actors.forEach( actor => actor.update() );

        // Check for ACTOR x PLAYER Collisions

        // Filter Actors
        this.Actors = this.Actors.filter( actor => !actor.clear);
    }

    updateProjectiles(){
        // Update Each Projectile
        this.Projectiles.forEach( (projectile) => projectile.update());

        // Check for PROJECTILE X PLAYER Collisions

        // Check for PROJECTILE X ACTOR Collisions

        // Filter Projectiles
        this.Projectiles = this.Projectiles.filter( proj => !proj.clear);

        // DEBUG
        // document.getElementById('proj').innerHTML = JSON.stringify(this.Projectiles);
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
}
