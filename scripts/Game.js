class Game{
    constructor(){
        this.Score = 0;
        this.hiScore = getHiScore().score;
        this.frames = 0;
        this.Wave = 0;
        this.Waves = [
            Wave06(),
            Wave01(),
            Wave02(),
            Wave03(),
            Wave04(),
            Wave05(),
            Wave06(),
        ];
        this.enemiesSpawned = 0;
        this.enemiesSlain = 0;
        this.powerUpsCollected = 0;
        this.Timer;
        this.Lives = 2;
        this.Level = 1;
        this.toNextLevel = 50;
        this.xp = 0;
        this.Player = new Player();
        this.Actors = [];
        this.Projectiles = [];
        this.Controllers = [];
        this.EFX = [];
        this.Background = new RasterBackground();
        this.gameOver = false;
        this.DBR = false;

        // START GAME
        drawScore(this.Score, 'score');
        drawScore(this.hiScore, 'hi-score');
        drawLives(this.Lives);
        this.showMessage(`Wave ${this.currentWave}`);
        drawWave(this.currentWave);
        this.Controllers.push(new Alarm(180, () => {
            this.hideMessage();
            this.startNextWave();
        }))
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

    hideMessage(){
        document.getElementById('message').classList.add('hidden');
    }

    showMessage(message){
        const messageContainer = document.getElementById('message');
        messageContainer.classList.remove('hidden');
        messageContainer.innerText = message;
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
        // Display Wave Complete
        // Display Next Wave
        // Begin Next Wave
        this.showMessage(`Wave Complete`);
        this.Controllers.push( new Alarm(120, ()=>{
            drawWave(this.currentWave);
            this.showMessage(`Wave ${this.currentWave}`);
            this.Controllers.push( new Alarm(120, ()=>{
                this.hideMessage();
                this.startNextWave();
            }))
        }))
    }

    startNextWave(){
        this.Controllers.push(this.Waves[this.Wave])
    }

    get killPercentage(){
        return this.enemiesSlain / this.enemiesSpawned;
    }

    updateLives(val){
        this.Lives += val;
        drawLives(this.Lives);
    }

    updateScore(points){
        this.Score+=points;
        drawScore(this.Score, 'score');
        if(this.Score > this.hiScore) {
            this.hiScore = this.Score;
            drawScore(this.Score, 'hi-score');
        }
    }

    updateXP(points){
        this.xp += points;
        if(this.xp >= this.toNextLevel){
            this.Level++;
            this.xp = this.xp - this.toNextLevel;
            this.toNextLevel += 25;
        }
        drawXP(this.xp, this.toNextLevel);
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
            this.updateLives(-1);
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
                        if(!actor.clear){
                            // CYLCE THROUGH HITBOXES
                            for(const hitbox of actor.getHitBoxes()){
                                if(overlap(hitbox,proj.getHitBox(0)) || overlap(proj.getHitBox(0),hitbox)){
                                    // Apply Damage
                                    actor.health -= proj.power;

                                    // Remove Projectile
                                    proj.health = 0;

                                    // Generate Blast
                                    if(proj.isFlame){
                                        const { blastDuration, blastRadius } = proj;
                                        this.Projectiles.push(new Blast(proj.x,proj.y,blastDuration,blastRadius));
                                    };

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
        }

        // PLAYER x PROJECTILE
        if(this.Player && !this.Player.inv){
            for(const proj of this.Projectiles){
                if(proj.type === 'enemy' && !proj.clear){
                    //CYCLE through PLAYER hitBoxes
                    for(const hitbox of this.Player.getHitBoxes()){
                        if(overlap(hitbox, proj.getHitBox(0)) || overlap(proj.getHitBox(0), hitbox)){
                            // Apply Damage
                            this.Player.health -= proj.power;
                            this.Player.inv = 60;

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

                if(actor.type === 'enemy' && !actor.clear && !this.Player.clear && !this.Player.inv){
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
                        const { score, health, lives, speed, weapon, temp } = actor.action;
                        if(score) {
                            this.updateScore(score);
                            this.updateXP(score);
                        }
                        if(health){
                            if(this.Player.health === 100){
                                this.updateScore(health * 5);
                            } else {
                                this.Player.health += health;
                                if(this.Player.health > 100) this.Player.health = 100;
                            }
                        }
                        if(lives){
                            this.updateLives(lives);
                        }
                        if(speed){
                            this.Player.speed += speed;
                            if(this.Player.speed > 8) this.Player.speed = 8;
                            if(this.Player.speed < 1) this.Player.speed = 1;
                        }
                        if(weapon){
                            const { shotType } = this.Player;
                            if(shotType === weapon){
                                // this.Player.shotLevel[shotType] += 1;
                            }else{
                                this.Player.shotType = weapon;
                            }
                        }
                        if(temp){
                            showTimer(temp);
                            switch(temp){
                                case 'bfg':
                                    this.Player.BFG = 500;
                                    break;
                                case 'inv':
                                    this.Player.inv = 500;
                                    break;
                            }
                        }
                        // CLEAR THE ACTOR
                        actor.health = -1;
                    }
                }
            }
        }
    }
}

// WAVES