// Controllers handle additional game logic

class Alarm{
    constructor(duration, action){
        this.duration = duration;
        this.action = action;
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

class Timeline{
    constructor(duration, moments){
        this.duration = duration;
        this.current = duration;
        this.moments = moments;
    }

    get time(){
        return this.duration - this.current;
    }

    get clear(){
        return !this.moments.filter(moment => !moment.clear).length;
    }

    update(time, game){
        // works like alarm, except events trigger at certain times...
        // first we decrease duration from time...
        this.current -= time;
        // timelines produce results in a linear fashion
        // each event has a specific time when it can happen
        // each event should have a clear flag as well.
        // so our logic should find the first element that clears the time test
        // then we check if that event has been triggered or not...
        // if the event has not been triggered, we call the function in the event, and set it's clear flag to true...
        const currentMoment = this.moments.find( moment => moment.timeStamp < this.time && !moment.clear);
        if(currentMoment){
            currentMoment.action(game);
            currentMoment.clear = true;
        }
        // timelines execute in a linear fashion... but i don't necessarily think they should have to be programmed that way...
        // but for simplicity, we WILL definitely execute the first 
        // timelines clear themselves once all of their events have been cleared...
    }
}

class Moment{
    constructor(timeStamp, action){
        this.timeStamp = timeStamp;
        this.action = action;
        this.clear = false;
    }
}

// HELPER FUNCTIONS

// Converts an seconds to milliseconds
const secondsToMS = (seconds) => {
    return seconds * 1000;
}

// ENEMY CONTROLLERS

class EnemySpawner extends Alarm{
    constructor(duration, interval, action){
        super(duration, action);
        // the interval property contains another alarm.
        this.intervalLength = interval;
        this.interval = new Alarm(this.intervalLength, action);
    }

    update(time, game){
        // Update Time
        this.duration -= time;

        // Perform action
        this.interval.update(time, game);

        // Once the alarm is cleared, we created another copy to execute
        if(this.interval.clear) this.interval = new Alarm(this.intervalLength, this.action);
    }
}

// SPAWN ENEMY FUNCTIONS

// Actions are functions to be called by Controllers.  Every action takes one parameter, a reference to the game.

const ActionSWPSpawn = (game) => {
    game.Actors.push(SWPlane.spawn());
}

const ActionKamikazeSpawn = (game) => {
    game.Actors.push(Kamikaze.spawn());
}

const ActionMGPSpawn = (game) => {
    const MGP1 = new MGPlane(100);
    const MGP2 = new MGPlane(viewport.width - 100);
    game.Actors.push(MGP1);
}

const ActionSWPSpawner = (game) => {
    // Define the Spawners Action
    game.Controllers.push(new EnemySpawner(secondsToMS(30), 1500, ActionSWPSpawn));
}

const ActionKamikazeSpawner = (game) => {
    game.Controllers.push(new EnemySpawner(secondsToMS(15), 1500, ActionKamikazeSpawn));
}

// TEST CODE
// if(this.Controllers.length === 0 && this.Actors.length === 0){
//     const spawnPlane = (g) => {
//         g.Actors.push(MGPlane.spawn());
//     }
//     this.Controllers.push(new EnemyController(1000,1000, spawnPlane))
// }

// BUILD TIMELINES

const testTimeline = (duration = secondsToMS(10)) => {
    const moments = [];
    const interval = secondsToMS(1);
    for(let i = duration; i >= 0; i-= interval){
        moments.push(new Moment(i, ActionSWPSpawn));
    }
    return new Timeline(duration, moments);
}

const testTimeline2 = (duration = secondsToMS(20)) => {
    const moments = [];
    const interval = secondsToMS(10);
    for( let i = duration; i >= 0; i -= interval){
        moments.push(new Moment(i, ActionMGPSpawn));
    }
    return new Timeline(duration, moments);
}

const testTimeline3 = (duration = secondsToMS(30)) => {
    const moments = [];
    moments.push(new Moment(0, ActionKamikazeSpawner));
    for( let i = secondsToMS(5); i <= duration; i+=i){
        moments.push(new Moment(i, ActionMGPSpawn));
    }
    return new Timeline(duration, moments);
}