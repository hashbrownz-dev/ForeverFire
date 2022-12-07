class Alarm{
    constructor(duration, func){
        this.duration = duration;
        this.action = func;
    }

    get clear(){
        return Math.floor(this.duration) <= 0;
    }

    update(time, game){
        this.duration -= time;
        if(this.clear){
            this.action(game);
        }
    }
}

class EnemyController extends Alarm{
    constructor(duration, interval, func){
        super(duration, func)
        this.intervalLength = interval;
        this.interval = new Alarm(this.intervalLength, func);
    }
    update(time, game){
        // Initialize OR Update Timer
        this.duration -= time;

        // Perform the specified action
        this.interval.update(time, game);
        if(this.interval.clear) this.interval = new Alarm(this.intervalLength, this.action);
    }
}

// Game -> Controller -> Enemy...  So the Game has 100% access to the Controller... Do we give Controllers access to the Game?  Of Course!  Controllers can reference the Game object through their update method, which accepts a binding to the Game object as a parameter...
// This would mean... that the ACTIONS we pass to the Enemy Controller, MUST accept ONE argument (THE GAME)