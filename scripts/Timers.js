// Alarm -> Perform a specified action ONCE after a set amount of time.

class Alarm{
    constructor(duration, action){
        this.duration = duration;
        this.action = action;
    }

    get clear(){
        return this.duration <= 0;
    }

    update(game){
        this.duration--;
        if(this.clear){
            this.action(game);
        }
    }
}

// Interval -> Repeat the specified every interval

class Interval{
    constructor(interval, action, duration = -1){
        this.interval = interval;
        this.timer = 0;
        this.action = action;
        this.duration = duration;
        this.clear = false;
    }

    update(game){
        this.timer--;
        this.duration--;

        if(this.timer <= 0){
            this.action(game);
            this.timer = this.interval;
        }

        if(this.duration === 0) this.clear = true;
        if(this.duration < 0 ) this.duration = -1;
    }
}

class Timeline{
    constructor(alarms){
        this.alarms = alarms;
        this.index = 0;
        this.current = this.alarms.shift();
    }

    update(game){
        if(!this.clear){
            this.current.update(game);
            if( this.current.clear && this.alarms.length > 0 ) this.current = this.alarms.shift();
        }
    }

    get clear(){
        return (this.alarms.length === 0 && this.current.clear)
    }

    // get current(){
    //     return this.alarms[this.index];
    // }
}

// HELPER FUNCTIONS

const secondsToFrames = (seconds) => {
    return seconds * 60
}

// DEMO TIMELINE

const alarms = [];
for(let i = 1000; i > 0; i--){
    const a = new Alarm(30, (game) => {
        const e = spawnSample();
        game.Actors.push(e);
    })
}

const demoTimeline = new Timeline(alarms);

const demoInterval = () => {
    return new Interval(60, (game) => {
        const i = Math.floor(Math.random() * 6 + 1);
        const invert = Math.round(Math.random()) ? true : false;
        game.Actors.push(spawnPotShotPacifist(0, false, i));
        // game.spawnEnemy(spawnPotShotCover(0, invert, 3, i));
        // game.Actors.push(spawnKamikazePacifist(0, invert, i));
    }, 60 * 15)
} 

const demoWave1 = new Timeline([demoInterval()]);
const demoWave2 = new Timeline([demoInterval()]);