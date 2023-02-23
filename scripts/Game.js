class Game{
    constructor(){
        this.Score = 0;
        this.hiScore = getHiScore().score;
        this.frames = 0;
        this.Wave = 0;
        this.Waves = [demoWave1(), demoWave2()];
        this.enemiesSpawned = 0;
        this.enemiesSlain = 0;
        this.powerUpsCollected = 0;
        this.Timer;
        this.Lives = 0;
        this.Player = new Player();
        this.Actors = [];
        this.Projectiles = [];
        this.Controllers = [];
        this.EFX = [];
        this.Background = new RasterBackground();
        this.gameOver = false;
        this.DBR = false;

        // START GAME
        this.Controllers.push(this.Waves[this.Wave])
    }

    static start(){
        Menu.clear();
        return new Game();
    }

    spawnEnemy(enemy){
        this.Actors.push(enemy);
        this.enemiesSpawned++;
    }

    get currentWave(){
        return this.Wave + 1;
    }

    get enemyCount(){
        const enemyProjectiles = this.Projectiles.filter( projectile => projectile.type === 'enemy');
        return enemyProjectiles.length + this.Actors.length;
    }

    filterCleared(){
        this.Actors = this.Actors.filter( actor => !actor.clear);
        this.Projectiles = this.Projectiles.filter( proj => !proj.clear);
        this.EFX = this.EFX.filter( effect => !effect.clear);
        this.Controllers = this.Controllers.filter( controller => !controller.clear);
    }

    loadNextWave(){
        this.Wave++;
        let current = this.Wave;
        if(current >= this.Waves.length){
            // current = current % this.Waves.length;
            this.gameOver = true;
            return
        }
        this.Controllers.push(this.Waves[current]);
    }

    get killPercentage(){
        return this.enemiesSlain / this.enemiesSpawned;
    }

    updateScore(points){
        this.Score+=points;
        if(this.Score > this.hiScore) this.hiScore = this.Score;
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

    update(input){
        // Update Frame
        this.frames++;
        // Update Controllers
        this.Controllers.forEach( controller => controller.update(this));

        // Update Player
        if(this.Player) this.Player.update(input, this);

        // Update Actors
        this.Actors.forEach( actor => actor.update(this) );

        // Update Projectiles
        this.Projectiles.forEach( projectile => projectile.update(this));

        // Check for Collisions
        this.checkForCollisions();

        // Update EFX
        this.EFX.forEach( emitter => emitter.update(this) );

        // CLEAN UP

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
                this.Controllers.push(new Alarm(120, respawnPlayer))
            } else { // Otherwise, Set GAMEOVER Timer
                const setGameOver = (game) => {
                    game.gameOver = true;
                }
                this.Controllers.push(new Alarm(120, setGameOver));
            }
            
        }

        // Filter CLEARED Items
        this.filterCleared();

        // Load Next Wave
        if(!this.Controllers.length && !this.enemyCount){
            this.loadNextWave();
        }
    }

    checkForCollisions(){
        // ACTOR x PROJECTILE
        for(const actor of this.Actors){
            if(actor.type === 'enemy'){
                for(const proj of this.Projectiles){
                    if(proj.type === 'player'){
                        // CYLCE THROUGH HITBOXES
                        for(const hitbox of actor.getHitBoxes()){
                            if(overlap(hitbox,proj.getHitBox(0)) || overlap(proj.getHitBox(0),hitbox)){
                                // Apply Damage
                                actor.health -= proj.power;

                                // Remove Projectile
                                proj.health = 0;
        
                                // Generate Effects
                                // Generate Bullet Impact
                                this.EFX.push(setEffectBulletImpact(proj.x,proj.drawY));
                                this.EFX.push(setEffectCircleExplosion(proj.x, proj.drawY, proj.drawW * 2));
                                // Generate Explosion
                                if(actor.clear){
                                    this.EFX.push(setEffectPartExplosion(actor.x,actor.y))
                                    this.EFX.push(setEffectCircleExplosion(actor.x,actor.y,actor.drawW/2))
                                }
                                // Generate Burn Trail
                                if(actor.hasOwnProperty('emitters')){
                                    // if actor's health is at 70% or 30%
                                    const percent = Math.floor(actor.health / actor.maxHealth * 10);
                                    if((percent === 7 && !actor.emitters.length) || (percent === 3 && actor.emitters.length === 1)){
                                        actor.emitters.push([proj.x - actor.x , proj.drawY - actor.y])
                                    }
                                }

                                // Update Score
                                // Add 1 point for each bullet that hits an enemy
                                this.updateScore(1);
                                // If the enemies is defeated:
                                if(actor.clear) {
                                    this.updateScore(actor.points);
                                    this.enemiesSlain++;
                                    // SPAWN POWER UP
                                    const drop = actor.drop;
                                    if(drop){
                                        this.Actors.push(drop);
                                    }
                                }
                            }
                        }  
                    }
                }
            }
        }

        // PLAYER x PROJECTILE
        if(this.Player){
            for(const proj of this.Projectiles){
                if(proj.type === 'enemy' && !proj.clear){
                    //CYCLE through PLAYER hitBoxes
                    for(const hitbox of this.Player.getHitBoxes()){
                        if(overlap(hitbox, proj.getHitBox(0)) || overlap(proj.getHitBox(0), hitbox)){
                            // Apply Damage
                            this.Player.health -= proj.power;

                            // Remove Projectile
                            proj.health = 0;

                            // Generate Effects
                            // Generate Bullet Impact
                            this.EFX.push(setEffectCircleExplosion(proj.x, proj.drawY, proj.drawW * 2));
                            // Generate Explosion
                            if(this.Player.clear){
                                this.EFX.push(setEffectPartExplosion(this.Player.x,this.Player.y))
                                this.EFX.push(setEffectCircleExplosion(this.Player.x,this.Player.y,this.Player.drawW/2))
                            }
                        }
                    }
                }
            }
        }

        // ACTOR x PLAYER
        if(this.Player){
            for(const actor of this.Actors){

                // ENEMIES

                if(actor.type === 'enemy' && !actor.clear && !this.Player.clear){
                    // CYCLE ACTOR HITBOXES
                    for(const actorHitBox of actor.getHitBoxes()){
                        // CYCLE PLAYER HITBOXES
                        for(const playerHitBox of this.Player.getHitBoxes()){
                            if(overlap(playerHitBox, actorHitBox) || overlap(actorHitBox, playerHitBox)){
                                // Apply Damage
                                this.Player.health -= 100;
                                actor.health -= 100;

                                // Generate Effects
                                if(this.Player.clear){
                                    this.EFX.push(setEffectPartExplosion(this.Player.x,this.Player.y))
                                    this.EFX.push(setEffectCircleExplosion(this.Player.x,this.Player.y,this.Player.drawW/2))
                                }
                                if(actor.clear){
                                    this.EFX.push(setEffectPartExplosion(actor.x,actor.y))
                                    this.EFX.push(setEffectCircleExplosion(actor.x,actor.y,actor.drawW/2))
                                }
                            }
                        }
                    }
                }

                // POWER UPS
                if(actor.type === 'power' && !actor.clear && !this.Player.clear){
                    // GET ACTOR HITBOX
                    const actorBox = actor.getHitBox(0);
                    // GET PLAYER HITBOX
                    const playerBox = {
                        x:this.Player.drawX,
                        y:this.Player.drawY,
                        w:this.Player.drawW,
                        h:this.Player.drawH
                    }
                    if(overlap(actorBox, playerBox) || overlap(playerBox, actorBox)){
                        // APPLY EFFECT
                        const { score, fuck } = actor.action;
                        if(score) this.Score += score;
                        if(fuck) console.log(fuck);
                        // CLEAR THE ACTOR
                        actor.health = -1;
                    }
                }
            }
        }
    }
}

// WAVES