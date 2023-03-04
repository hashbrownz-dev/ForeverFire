const intermission = (duration = 30) => {
    return new Alarm(duration, ()=>{})
}

/*=============/
    ENEMIES
==============*/

/*=============/
    WAVE 01
==============*/

// W1P1

const w1p1 = () => {
    const spawn = (game) => {
        const enemy = new PotShot(0,false);
        enemy.x = getRandom(200, 600);
        enemy.speed = 4;
        enemy.points = 9;
        enemy.styles = setColors(white, aqua, enemy);

        game.Actors.push(enemy);
    }
    return new Interval(60, spawn, 480)
}

// W1P2

const w1p2 = () => {
    const spawn = (game) => {
        const enemy = new PotShot(0,false,60,shootAtPlayer(-1,4,90));
        enemy.x = getRandom(200, 600);
        enemy.health = 3;
        enemy.speed = 3;
        enemy.points = 10;
        enemy.styles = setColors(yellow, aqua, enemy);

        game.Actors.push(enemy);
    }
    return new Interval(60, spawn, 480);
}

// W1P3

const w1p3 = () => {
    const spawn = (game) => {
        const enemy = new Gunner(viewport.width/2, false, 20, 120, shootSpread(60, 4, 5, 20, 90));
        enemy.dropType = 's';
        enemy.styles = setColors(red, gold, enemy);

        game.Actors.push(enemy);
    }
    return [
        new Alarm(0,spawn),
        new Alarm(300, ()=>{})
    ]
}

// W1P4

const w1p4 = () => {
    const spawn = (game) => {
        // Spawn a flying V of potShots, with one potShot selected at random to be a 'healer'
        const enemies = [ new PotShot(viewport.width/2) ];
        const xOffset = enemies[0].drawW, yOffset = enemies[0].drawH / 2;
        enemies.push(
            new PotShot(enemies[0].x + xOffset),
            new PotShot(enemies[0].x - xOffset),
            new PotShot(enemies[0].x + (xOffset * 2)),
            new PotShot(enemies[0].x - (xOffset * 2))
        );
        enemies[1].y -= yOffset;
        enemies[2].y -= yOffset;
        enemies[3].y -= yOffset * 2;
        enemies[4].y -= yOffset * 2;

        const healerIndex = getRandom(0, 4);

        for(const enemy of enemies){
            enemy.speed = 4;
            if( healerIndex === enemies.indexOf(enemy)){
                enemy.healer = true;
                enemy.points = 14;
                enemy.styles = setColors(lime, white, enemy);
            } else {
                enemy.points = 9;
                enemy.styles = setColors(white, lime, enemy);
            }
        }

        game.Actors.push(...enemies);
    }
    return new Interval(120, spawn, 360);
}

const Wave01 = () => new Timeline([
    w1p1(),
    intermission(120),
    w1p2(),
    ...w1p3(),
    w1p2(),
    w1p4()
]);

/*=============/
    WAVE 02
==============*/

const w2p1 = () => {
    const spawn = (game) => {
        const enemy = new Kamikaze(getRandom(150,650));
        enemy.speed = getRandom(6,8);
        game.Actors.push(enemy);
    }
    return new Interval(20, spawn, 360);
}

const w2p2 = () => {
    // we can either
    // create a dynamic list of alarms
    // create another timeline and embed it?  (not sure if possible)
    // a timeline is a series of alarms.
    // an alarm basically performs an action after the alotted time...
    // let's say that every 20 frames we want to create a kamikaze
    // and every 40 frames we want to create a potshot
    // and we want to do this for 360 frames...
    const spawnP = (game) => {
        const {Player} = game;
        const enemy = new PotShot(0,false,60,shootAtPlayer(-1,4,90));
        enemy.speed = 3;
        enemy.health = 3;
        enemy.points = 14;
        enemy.styles = setColors(yellow, aqua, enemy);

        if(Player){
            enemy.x = getRandom(Player.x - 50, Player.x + 50);
            if(enemy.x < 50) enemy.x = 50;
            if(enemy.x > 550) enemy.x = 550;
        } else {
            enemy.x = getRandom(100,700);
        }
        game.Actors.push(enemy);
    }
    const spawnK = (game) => {
        const {Player} = game;
        const enemy = new Kamikaze(0);
        enemy.speed = getRandom(6,8);
        if(!Player){
            enemy.x = getRandom(100,700);
        } else {
            if(Math.round(Math.random())){
                // LEFT
                enemy.x = getRandom(Player.x - 300, Player.x - 100);
                if(enemy.x <= 0) enemy.x = enemy.drawW;
            } else {
                // RIGHT
                enemy.x = getRandom(Player.x + 100, Player.x + 300);
                if(enemy.x >= viewport.width) enemy.x = viewport.width - enemy.drawW;
            }
        }
        game.Actors.push(enemy);
    }
    const alarms = [];
    let cdur = 0;
    for(let i = 0; i <= 360; i++){
        // on every 20th frame, create an alarm with a duration of 20 and a spawn kamikaze action
        // on every 40th frame, create an alarm with a duration of 20 and a spawn potshot action
        
        if(!(i % 20)){
            alarms.push(new Alarm(cdur, spawnK));
            cdur = 0;
        }
        if(!(i % 40)){
            alarms.push(new Alarm(cdur, spawnP));
            cdur = 0;
        }
        cdur++;
    }
    return alarms;
}

const w2p3 = () => {
    const spawn = (game) => {
        const eS = new Gunner(viewport.width/2 - 150, false, 20, 120, shootSpread(60,4,5,20,90));
        const eF = new Gunner(viewport.width/2 + 150, false, 20, 120, shootSpread(60,4,5,20,90));
        eS.dropType = 's';
        eF.dropType = 'f';
        eS.styles = setColors(red, gold, eS);
        eF.styles = setColors(gold, red, eF);

        game.Actors.push(eS,eF);
    }
    return [
        new Alarm(0,spawn),
        intermission(450)
    ]
}

const Wave02 = () => new Timeline([
    w2p1(),
    ...w2p2(),
    ...w2p3(),
])

const testWave = () => new Timeline([
    ...w2p3(),
    w2p1(),
    ...w2p2()
])