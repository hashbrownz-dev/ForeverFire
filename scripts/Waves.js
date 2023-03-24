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
        // const enemies = [];
        // for(let i = 8; i > 0; i--){
        //     enemies.push(spawnActor(ps));
        // }
        // formRow(50, enemies);
        // formCrossX(200, enemies);
        // formV(400, enemies);
        // formBoat(400, enemies);
        // formBox(400, enemies, 4);
        // formTriangle(400, enemies, 40);
        // game.Actors.push(...enemies);
        // game.Actors.push(spawnActor(psX));
        // game.Actors.push(spawnActor(psCross));
        game.Actors.push(spawnActor(aceCircle()));
        game.Actors.push(spawnActor(aceCircle(true)));
        // y, spawnLeft : Bool, keyframes : { duration : Number, action : Function(ace) => { turnActor(ace, interval)}}
        
    }
    return new Interval(120, spawn, 480)
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

const w2p4 = () => {
    const spawn = (game) => {
        const spawnX = getRandom(100,700);
        const leader = new PotShot(spawnX, false, 60, shootAtPlayer(-1,4,90))
        leader.health = 3;
        leader.speed = 3;
        leader.points = 20;
        leader.rank = 2;
        leader.styles = setColors(red, gold, leader);

        const eL = new PotShot(spawnX - leader.drawW);
        const eR = new PotShot(spawnX + leader.drawW);

        eL.y = leader.y - leader.drawH;
        eR.y = leader.y - leader.drawH;

        eL.speed = 3;
        eR.speed = 3;

        game.Actors.push(leader,eL,eR);
    }
    return new Interval(60, spawn, 480);
}

const w2p5 = () => {
    const spawn = (game) => {
        const spawnX = getRandom(150,650);
        const healer = new PotShot(spawnX, false, 90, shootArc(-1, 4, 8, 0, 359));
        healer.y -= healer.drawH - 10;
        healer.health = 5;
        healer.speed = 3;
        healer.points = 25;
        healer.healer = true;
        healer.styles = setColors(lime, red, healer);

        const subs = [];
        for(let i = 0; i < 4; i++){
            const sub = new PotShot(spawnX);
            sub.y = healer.y;
            sub.speed = 3;
            sub.rank = 2;
            sub.styles = setColors(white, lime, sub);
            subs.push(sub);
        }
        subs[0].x += healer.drawW + 10;
        subs[1].x -= healer.drawW + 10;
        subs[2].y -= healer.drawH + 10;
        subs[3].y += healer.drawH + 10;

        game.Actors.push(healer, ...subs);
    }
    return new Interval(90, spawn, 540);
}

const Wave02 = () => new Timeline([
    w2p1(),
    ...w2p2(),
    ...w2p3(),
    w2p4(),
    w2p5(),
])

/*=============/
    WAVE 03
==============*/

const w3p1 = () => {
    const spawn = (game) => {
        const gunS = new Gunner(200, false, 30, 90, shootSpread(90, 3, 6, 15, 90));
        const gunF = new Gunner(600, false, 30, 90, shootSpread(90, 3, 6, 15, 90));
        const gunM = new Gunner(400, false, 30, 60, shootAtPlayer(30, 5, 90));

        gunM.y -= gunM.drawH / 2;
        gunS.dropType = 's';
        gunF.dropType = 'f';
        gunM.dropType = 'm';
        gunS.styles = setColors(red, aqua, gunS);
        gunM.styles = setColors(lime, aqua, gunM);
        gunF.styles = setColors(gold, aqua, gunF);

        game.Actors.push(gunS, gunF, gunM);
    }
    return [
        new Alarm(0, spawn),
        intermission(600),
    ]
}

const w3p3 = () => {
    const spawnGun = (game) => {
        const enemy = new Gunner(400, false, 40, 90, shootArc(60, 4, 4, 65, 140));
        enemy.rank = 2;
        enemy.styles = setColors(aqua, pink, enemy);
        
        game.Actors.push(enemy);
    }
    const spawnKL = (game) => {
        const enemy = new Kamikaze(250);
        enemy.speed = 5;
        enemy.styles = setColors(pink, aqua, enemy);

        game.Actors.push(enemy);
    }
    const spawnKR = (game) => {
        const enemy = new Kamikaze(550);
        enemy.speed = 5;
        enemy.styles = setColors(aqua, pink, enemy);

        game.Actors.push(enemy);
    }

    const alarms = [new Alarm(0, spawnGun)];

    let left = false;
    for(let i = 0; i <= 450; i++){
        if(!(i%15)){
            left ? alarms.push(new Alarm(15, spawnKL)) : alarms.push(new Alarm(15, spawnKR));
            left = !left;
        }
    }
    return alarms;
}

const w3p4 = () => {
    const spawn = (game) => {
        const enemies = [ new PotShot(400, false, 60, shootArc(-1, 6, 4, 65, 140 )) ];
        const xOffset = enemies[0].drawW + 25, yOffset = enemies[0].drawH / 2;
        enemies.push(
            new PotShot(400 + xOffset, false, 90, shootArc( -1, 6, 4, 65, 140)),
            new PotShot(400 - xOffset, false, 90, shootArc( -1, 6, 4, 65, 140)),
            new PotShot(400 + (xOffset * 2), false, 120, shootArc( -1, 6, 4, 65, 140)),
            new PotShot(400 - (xOffset * 2), false, 120, shootArc( -1, 6, 4, 65, 140))
        )
        enemies[1].y -= yOffset;
        enemies[2].y -= yOffset;
        enemies[3].y -= yOffset * 2;
        enemies[4].y -= yOffset * 2;
        for(const enemy of enemies){
            enemy.speed = 2;
            enemy.health = 4;
            enemy.rank = 2;
            enemy.styles = setColors(lime, red, enemy);
        }
        
        game.Actors.push(...enemies);
    }
    return new Interval(180, spawn, 720);
}

const Wave03 = () => new Timeline([
    ...w3p1(),
    ...w2p2(),
    ...w3p3(),
    w3p4()
]);

/*=============/
    WAVE 04
==============*/

const w4p1 = () => {
    const spawnP = (game) => {
        const enemy = new PotShot(getRandom(50,750), false, getRandom(30,90), shootAtPlayer(-1, 6, 90));
        enemy.health = 4;
        enemy.speed = getRandom(2,4);
        enemy.points = 14;
        enemy.rank = 2;
        enemy.styles = setColors(aqua, pink, enemy);
        
        game.Actors.push(enemy);
    }

    const spawnK = (game) => {
        const enemy = new Kamikaze(getRandom(50,750), false, getRandom(30,60), shootAtPlayer(-1, 8, 90));
        enemy.speed = getRandom(4,8);
        enemy.points = 19;
        enemy.rank = 3;
        enemy.styles = setColors(pink, aqua, enemy);

        game.Actors.push(enemy);
    }

    const alarms = [];
    let dur = 0;
    for(let i = 0; i <= 600; i++){
        if(!(i % 30)){
            alarms.push(new Alarm(dur, spawnK));
            dur = 0;
        }
        if(!(i%45)){
            alarms.push(new Alarm(dur, spawnP));
            dur = 0;
        }
        dur++;
    }
    return alarms;
}

const w4p2 = () => {
    const spawnG = (game) => {
        const gunS = new Gunner(200, false, 30, 90, shootSpread(90, 3, 6, 15, 90));
        const gunF = new Gunner(600, false, 30, 90, shootSpread(90, 3, 6, 15, 90));
        const gunM = new Gunner(400, false, 30, 60, shootAtPlayer(30, 5, 90));

        gunM.y -= gunM.drawH / 2;
        gunS.dropType = 's';
        gunF.dropType = 'f';
        gunM.dropType = 'bfg';
        gunS.styles = setColors(red, aqua, gunS);
        gunM.styles = setColors(lime, aqua, gunM);
        gunF.styles = setColors(gold, aqua, gunF);

        game.Actors.push(gunS, gunF, gunM);
    }
    const spawnK = (game) => {
        const enemy = new Kamikaze(getRandom(100,700));
        enemy.speed = getRandom(3,6);

        game.Actors.push(enemy);
    }
    return [
        new Alarm(0, spawnG),
        new Interval(30, spawnK, 450),
        intermission(150),
    ]
}

const w4p4 = () => {
    const spawnG = (game) => {
        const g = new Gunner(400, false, 40, 120, shootSpread(60,4,5,20,90));
        
    }
}

const Wave04 = () => new Timeline([
    ...w4p1(),
    ...w4p2(),
    ...w4p1(),

])

const testWave = () => new Timeline([
    w1p1(),
    ...w4p2(),
    ...w4p1()
])